#import cv2 # importar libreria opencv

#face_cascade = cv2.CascadeClassifier('raw.githubusercontent.#com_opencv_opencv_master_data_haarcascades_haarcascade_frontalface_default.xml')

#cap = cv2.VideoCapture(0) # capturar video de la camara

#while True:
#    _, img = cap.read()
#    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#    faces = face_cascade.detectMultiScale(gray, 1.1, 4) # poner la imagen en escala de grises
#    for (x, y, w, h) in faces:
#        cv2.rectangle(img, (x,y), (x+w, y+h), (255, 0, 0), 2) # dibujar un rectangulo
#    cv2.imshow('img', img) # mostrar la imagen
#    k = cv2.waitKey(30) 
#    if k == 27:
#        break
#cap.release()


import cv2
import numpy as np

img_path = "/img-cara.jpeg"
img = cv2.imread(img_path)

filtro_calvo_path = "/img-calvo.png"
filtro_calvo = cv2.imread(filtro_calvo_path, -1)




def aplicar_filtro_calvo(imagen, filtro, x, y):
    h, w, _ = filtro.shape
    roi = imagen[y:y+h, x:x+w]

    # Fusionar el filtro en la región de interés de la imagen
    mascara_filtro = filtro[:, :, 3] / 255.0
    mascara_filtro = np.expand_dims(mascara_filtro, axis=2)
    mascara_filtro = np.repeat(mascara_filtro, 3, axis=2)
    filtro_rgb = filtro[:, :, :3]
    fondo = cv2.multiply(1.0 - mascara_filtro, roi.astype(float) / 255.0)
    filtro_aplicado = cv2.multiply(mascara_filtro, filtro_rgb.astype(float) / 255.0)
    roi = cv2.add(fondo, filtro_aplicado)
    imagen[y:y+h, x:x+w] = (roi * 255).astype(np.uint8)

    return imagen

# Coordenadas donde colocar el filtro en la imagen
x = 100
y = 100

imagen_con_filtro = aplicar_filtro_calvo(img.copy(), filtro_calvo, x, y)

# Mostrar el resultado
cv2.imshow("Imagen con filtro calvo", imagen_con_filtro)
cv2.waitKey(0)
cv2.destroyAllWindows()