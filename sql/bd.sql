CREATE DATABASE axelote;
USE axelote;

CREATE TABLE usuario (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre_real VARCHAR(85) NOT NULL,
    apellido_real VARCHAR(35) NOT NULL,
    nombre_de_usuario VARCHAR(35) NOT NULL,
    email VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    fecha_de_nacimiento DATE NOT NULL,
    fecha_de_creacion DATETIME NOT NULL
);

CREATE TABLE producto (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT NOT NULL,
    url_de_la_imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    cantidad_de_stock SMALLINT UNSIGNED NOT NULL
);

CREATE TABLE carrito (
    usuario_id INT UNSIGNED,
    producto_id INT UNSIGNED,
    fecha_en_la_que_se_agrego DATETIME NOT NULL,
    PRIMARY KEY (usuario_id, producto_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

INSERT INTO usuario (nombre_real, apellido_real, nombre_de_usuario, email, direccion, contrasenia, fecha_de_nacimiento, fecha_de_creacion) VALUES
('Carlos', 'Pérez', 'carlosp', 'carlos.perez@example.com', 'Calle Falsa 123, Ciudad', SHA2('password1', 512), '1985-01-15', NOW()),
('Ana', 'García', 'anag', 'ana.garcia@example.com', 'Avenida Siempre Viva 742, Ciudad', SHA2('password2', 512), '1990-07-22', NOW()),
('Luis', 'Martínez', 'luism', 'luis.martinez@example.com', 'Calle del Sol 456, Ciudad', SHA2('password3', 512), '1988-03-10', NOW()),
('Laura', 'Fernández', 'lauraf', 'laura.fernandez@example.com', 'Plaza Mayor 12, Ciudad', SHA2('password4', 512), '1992-11-05', NOW()),
('Juan', 'Rodríguez', 'juanr', 'juan.rodriguez@example.com', 'Calle de la Luna 33, Ciudad', SHA2('password5', 512), '1983-06-30', NOW()),
('Marta', 'Lopez', 'martal', 'marta.lopez@example.com', 'Avenida de la Paz 98, Ciudad', SHA2('password6', 512), '1987-10-15', NOW()),
('Ricardo', 'Hernández', 'ricardoh', 'ricardo.hernandez@example.com', 'Calle del Río 21, Ciudad', SHA2('password7', 512), '1991-04-20', NOW()),
('Sofía', 'Jiménez', 'sofia', 'sofia.jimenez@example.com', 'Calle del Mar 44, Ciudad', SHA2('password8', 512), '1989-08-12', NOW()),
('Pedro', 'Castro', 'pedroc', 'pedro.castro@example.com', 'Calle de la Montaña 77, Ciudad', SHA2('password9', 512), '1993-02-28', NOW()),
('Isabel', 'Vázquez', 'isabelv', 'isabel.vazquez@example.com', 'Avenida de la Estrella 55, Ciudad', SHA2('password10', 512), '1994-12-01', NOW());

INSERT INTO producto (nombre, descripcion, url_de_la_imagen, precio, cantidad_de_stock) VALUES
('PC Gaming High-End', 'PC de alto rendimiento para juegos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdt7H1Zp1syJr9HUoAdqSZeU9KMAOoAKu-uA&s', 1500.00, 10),
('Notebook Ultraligera', 'Notebook liviana con pantalla de 14 pulgadas', 'https://urumarket.com.uy/wp-content/uploads/2023/04/LG-GRAM-15Z90Q-1.png', 900.00, 20),
('Celular 5G', 'Celular con tecnología 5G y 128GB de almacenamiento', 'https://m.media-amazon.com/images/I/41loWvNMt+L._SL500_.jpg', 799.99, 25),
('Tablet Pro 12"', 'Tablet con pantalla de 12 pulgadas y 256GB de almacenamiento', 'https://f.fcdn.app/imgs/5a4da9/www.zonatecno.com.uy/zoteuy/93c0/original/catalogo/103042_103042_2/1500-1500/tablet-apple-ipad-pro-m2-256gb-8gb-2022-mnxr3-12-9-s-gray-tablet-apple-ipad-pro-m2-256gb-8gb-2022-mnxr3-12-9-s-gray.jpg', 499.99, 15),
('PC Oficina', 'PC básica ideal para oficina', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeNG5SKeeBNT3GXdlcqmmkH6w1BiXURyVuA&s', 600.00, 30),
('Notebook Gaming', 'Notebook con capacidad para juegos y multitarea', 'https://f.fcdn.app/imgs/e7c7fa/www.zonatecno.com.uy/zoteuy/872f/original/catalogo/105126_105126_1/1500-1500/notebook-gamer-rog-strix-g15-g513r-ryzen-7-6800hs-512gb-16gb-notebook-gamer-rog-strix-g15-g513r-ryzen-7-6800hs-512gb-16gb.jpg', 1200.00, 12),
('Celular de Alta Gama', 'Celular con pantalla OLED y 256GB de almacenamiento', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNeEtesZ30TCYOB4PRe0XnBMmFkG3215Ca1w&s', 999.99, 18),
('Tablet Básica', 'Tablet básica para uso general con 64GB de almacenamiento', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgcV71MiC6re9ugmRcOQyp-Y1kDj1KtrlmIA&s', 299.99, 20),
('PC Estudio', 'PC para edición de video y diseño gráfico', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo-BwErk5fHIwpyl2E2iNh75VtG9JWvlYOGQ&s', 1400.00, 8),
('Notebook Convertible', 'Notebook convertible con pantalla táctil de 13 pulgadas', 'https://www.netcomuruguay.com/imgs/productos/productos34_24119.jpg', 850.00, 25);

INSERT INTO carrito (usuario_id, producto_id, fecha_en_la_que_se_agrego) VALUES
(1, 1, NOW()),
(1, 3, NOW()),
(2, 2, NOW()),
(2, 4, NOW()),
(3, 5, NOW()),
(3, 6, NOW()),
(4, 7, NOW()),
(4, 8, NOW()),
(5, 9, NOW()),
(5, 10, NOW());