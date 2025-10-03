import sys
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# Load saved model
model = load_model('waste_model.h5')

# Load image path from argument
img_path = sys.argv[1]
img = image.load_img(img_path, target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)/255.0

pred = model.predict(x)
classes = ["Plastic", "Paper", "Metal", "Organic", "Other"]
print(classes[np.argmax(pred)])
