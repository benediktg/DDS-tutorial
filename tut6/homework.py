#!/usr/bin/python3

import socket
import sys

TCP_IP = ""
TCP_PORT = 5000


def create_error_page(conn, err_string):
    response = ("HTTP/1.1 200 OK\r\n"
                "Connection: close\r\n"
                "Content-Type: text/html; charset=UTF-8\r\n"
                "\r\n"
                "<html><head><title>ERROR</title></head>\r\n"
                "<body><h1>Error</h1><hr/><p>{}</p></body></html>"
                .format(err_string))
    conn.send(response.encode())
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

    # get cookie information (begin)
    cookies = {}
    if 'Cookie' in header:
        cookieList = header['Cookie'].split("; ")
        for item in cookieList:
            key, value = item.split("=")
            cookies[key] = value

    if 'kontostand' in cookies:
        kontostand = float(cookies['kontostand'])
    else:
        kontostand = 100
    # (end)

    if body:
        pairs = body.split("&")
        for pair in pairs:
            key, value = pair.split("=")
            values[key] = value

    if 'amount' in values:
        try:
            amount = float(values['amount'])
        except:
            create_error_page(conn, "{} ist kein Fliesskommawert"
                              .format(values['amount']))
            return

        kontostand -= amount

    http_method = head.split(" ")[0]
    if http_method == "POST":
        # post redirect get pattern (begin)
        response = ("HTTP/1.1 303 See Other\r\n"
                    "Connection: close\r\n"
                    "Content-Type: text/html; charset=UTF-8\r\n"
                    "Set-Cookie: kontostand={:5.2f}\r\n"
                    "Location: /\r\n"
                    "\r\n".format(kontostand))
        # (end)
    else:
        response = ("HTTP/1.1 200 OK\r\n"
                    "Connection: close\r\n"
                    "Content-Type: text/html; charset=UTF-8\r\n"
                    "Set-Cookie: kontostand={:5.2f}\r\n"
                    "\r\n"
                    "<html><head><title>Konto</title></head>\r\n"
                    "<body><h1>Konto</h1><hr/>\r\n".format(kontostand))
        if 'amount' in values:
            response += "<p>Überwiesen = {:5.2f}</p>\r\n".format(amount)
        response += ("<p>Neuer Kontostand = {:5.2f}</p>\r\n"
                     "<form method=\"POST\">\r\n"
                     "<p>Betrag zum Überweisen: "
                     "<input type=\"text\" name=\"amount\"/></p>\r\n"
                     "<p><input type=\"submit\" value=\"Abschicken\"/></p>\r\n"
                     "</form>\r\n"
                     "</body></html>\r\n".format(kontostand))

    conn.send(response.encode())
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
