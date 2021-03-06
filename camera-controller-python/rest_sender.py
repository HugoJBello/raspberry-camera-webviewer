
import urllib.request
import ssl
import certifi
from contextlib import closing
from urllib.parse import urlencode
import base64

class RestSender:

    def __init__(self, url,username,password,camera_id):
        self.url = url # "http://hjbello.hopto.org:3333/save_new_shot"
        self.username = username # "norhug"
        self.password = password #"b1234"
        self.camera_id = camera_id # "camera_2"


    def send_shot(self,filename,full_path):
        context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
        context.verify_mode = ssl.CERT_REQUIRED
        context.load_verify_locations(certifi.where())
        https_handler = urllib.request.HTTPSHandler(context = context)

        manager = urllib.request.HTTPPasswordMgrWithDefaultRealm()
        manager.add_password(None, self.url, self.username, self.password)
        auth_handler = urllib.request.HTTPBasicAuthHandler(manager)

        opener = urllib.request.build_opener(https_handler, auth_handler)

        urllib.request.install_opener(opener)

        base64_image = self.encode_base64_image(full_path)
        data = urlencode({"filename" : filename, "path": full_path, "base64": base64_image, "camera_id": self.camera_id}).encode()

        response = urllib.request.urlopen(self.url,data)
        
        print(response.read())
        return response.read().decode("utf-8") 

    def encode_base64_image(self,path):
        with open(path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            return encoded_string
