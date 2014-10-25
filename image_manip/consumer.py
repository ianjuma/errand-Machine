#! /usr/bin/env python

from __future__ import print_function
from PIL import Image
from PIL import ImageFilter
import os, sys

import cv2
import numpy as np

# image groups
small = (128, 128)
medium = (784, 250)
large = (801, 250)
bigImage = (801, 400)


def getImageDimension(image_uri):
	"""
	return a tuple of image dimensions f(image) => (x, y)
	"""

	try:
		with Image.open(image_uri) as im:
			print(image_uri, im.format, "%dx%d" % im.size, im.mode)
	except IOError:
		# log
		pass

	return im.size


def compressImage(image_uri, resize_to, filename, quality=65):
	"""
	reduce and compress image f(image, resize_tuple, filename) => compressed_image
	"""
	im = Image.open(image_uri)
	image = im.resize( resize_to , Image.ANTIALIAS)
	image.save(filename, 'JPEG', quality=quality, optimize=True)


def blurImage(image_uri, filename, quality=65):
	"""
	blur image uri
	"""
	im = Image.open(image_uri)
	blurred = im.filter(ImageFilter.BLUR)
	im.save(filename, 'JPEG', quality=quality, optimize=True)



def gaussianBlur(image_uri, filename, blur_level=0):
    img = cv2.imread(image_uri)
    gaussian_blur = cv2.GaussianBlur(img,(5,5),blur_level)
    cv2.imwrite(filename, gaussian_blur)


# image sample manipulation
# 0-100 -> 0 is higer compression
#getImageDimension('ian.jpg')
#blurImage('ian.jpg', 'ian2.jpg', 65)
gaussianBlur('ian.jpg', 'ian2.jpg', 1000)
#compressImage('ian.jpg', small, 'ian2.jpg')
