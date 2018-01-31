import sys
sys.path.append("..")
from rest_sender import RestSender
import json

import unittest

class TestSendRest(unittest.TestCase):  

	def testSend(self):
		with open('config-test.json', 'r') as f:
			config = json.load(f)
			print(config)
			restSender = RestSender(config["REST_URL"], config["REST_USER"], config["REST_PASSWORD"], config["CAMERA_ID"])
			result = restSender.send_shot("test_image.jpeg","test_image.jpeg")
			
			self.assertIn(result, "saved correctly")


if __name__ == '__main__':
	unittest.main()