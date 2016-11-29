#!/usr/bin/env python3

import socket
import sys

KONTOSTANDFILE = "konto.txt"

TCP_IP = ""
TCP_PORT = 5000


def create_error_page(conn, err_string):
    conn.send("HTTP/1.1 200 OK\r\n"
              "Connection: close\r\n"
              "Content-Type: text/html; charset=UTF-8\r\n"
              "\r\n"
              "<html><head><title>ERROR</title></head>\r\n"
              "<body><h1>Error</h1><hr/><p>{}</p></body></html>"
              .format(err_string).encode())
    conn.close()


def handleRequest(conn):
    data = conn.recv(1024).decode()

    head, body = data.split("\r\n\r\n")
    header = {}
    values = {}

    lines = head.split("\r\n")
    for line in lines[1:]:
        key, value = line.split(": ")
        header[key] = value

    # TODO: get cookie information

    if body:
        pairs = body.split("&")
        for pair in pairs:
            key, value = pair.split("=")
            values[key] = value

    try:
        kf = open(KONTOSTANDFILE, "r")
        kontostand = float(kf.read(1024))
        kf.close()
    except:
        kontostand = 100

    if 'amount' in values:
        try:
            amount = float(values['amount'])
        except:
            create_error_page(conn, "{} ist kein Fliesskommawert"
                              .format(values['amount']))
            return

        kontostand -= amount

        try:
            kf = open(KONTOSTANDFILE, "w")
            kf.write("{:5.2f}".format(kontostand))
            kf.close()
        except:
            create_error_page(conn, "Probleme mit dem Kontostandsfile")
            return

    conn.send("HTTP/1.1 200 OK\r\n"
              "Connection: close\r\n"
              "Content-Type: text/html; charset=UTF-8\r\n"
              "\r\n"
              "<html><head><title>Konto</title></head>\r\n"
              "<body><h1>Konto</h1><hr/>\r\n".encode())
    if 'amount' in values:
        conn.send("<p>Überwiesen = {:5.2f}</p>\r\n".format(amount).encode())
    conn.send('<p>Neuer Kontostand = {:5.2f}</p>\r\n'
              '<form method="POST">\r\n'
              '<p>Betrag zum Überweisen: '
              '<input type="text" name="amount"/></p>\r\n'
              '<p><input type="submit" value="Abschicken"/></p>\r\n'
              '</form>\r\n'
              '</body></html>\r\n'.format(kontostand).encode())
    conn.close()
    return

if __name__ == "__main__":
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((TCP_IP, TCP_PORT))
    s.listen(1)

    while 1:
        conn, addr = s.accept()
        handleRequest(conn)
