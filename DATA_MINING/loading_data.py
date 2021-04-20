import csv
import uuid
import psycopg2
import requests
import urllib
import json
import re

import logging
logging.basicConfig(filename='data_processing.log',
                    encoding='utf-8', level=logging.DEBUG)


def computeAvailableCompanyOnApi():
    data = []
    with open('WIKI_PRICES.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=';')
        for row in csv_reader:
            ticker = row[0]
            try:
                req = QUANDL_API_URL + ticker + QUANDL_END_URI_LIMIT
                with urllib.request.urlopen(req):
                    row[1] = "true"
            except urllib.error.URLError as e:
                row[1] = "false"
            data.append(row)

    with open('WIKI_PRICES.csv', 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(data)


def InsertCompany(name, ticker):
    logging.debug("start insert company for {}".format(ticker))
    queryCompany = "INSERT INTO companies (name, ticker) values ({},{})".format(
        name, ticker)
    try:
        cur.execute(queryCompany)
        conn.commit()
    except:
        logging.error("Error while adding company" + ticker)


def insertPrices(ticker, data):
    date = "'{}'".format(data[0])
    open = data[1]
    high = data[2]
    low = data[3]
    close = data[4]
    values = "({}, {}, {}, {}, {}, {})".format(
        ticker, date, open, high, low, close)
    query = "INSERT INTO prices (ticker, date, value_open, value_close, value_low, value_high) VALUES{}".format(
        values)
    logging.debug("insert value for {} in {}".format(ticker, date))
    cur.execute(query)
    conn.commit()


def insertPricesByCompanies():
    with open('WIKI_PRICES.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if(row[1] == 'true'):
                ticker = row[0]
                # logging.debug("start process for {}".format(ticker))
                req = QUANDL_API_URL + ticker + QUANDL_END_URI
                with urllib.request.urlopen(req) as response:
                    string = response.read().decode('utf-8')
                    json_obj = json.loads(string)
                    company = re.sub(
                        '\ Stock Prices, Dividends and Splits$', '', json_obj['dataset']['name'])
                    company = "'{}'".format(company.replace("'", ' '))
                    InsertCompany(company, "'{}'".format(ticker))
                    for element in json_obj['dataset']['data']:
                        insertPrices( "'{}'".format(ticker), element)



DATABASE_URL = "postgres://kepwyisoucmfoh:224ff4534b3ac438aa2c048b95f16847f40cd4949e4a4903cfed39f5cb2431ae@ec2-108-128-104-50.eu-west-1.compute.amazonaws.com:5432/d5u7t48fn0b8rq"
conn = psycopg2.connect(DATABASE_URL, sslmode='require')
cur = conn.cursor()
QUANDL_API_URL = "https://www.quandl.com/api/v3/datasets/EOD/"
QUANDL_END_URI_LIMIT = ".json?api_key=LDCPMz-PzQMvV-gguz4_&limit=1"
QUANDL_END_URI = ".json?api_key=LDCPMz-PzQMvV-gguz4_"
# cur = createDBConnexion()
# computeAvailableCompanyOnApi()
insertPricesByCompanies()
cur.close()
