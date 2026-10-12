# Juegos para compartir

Web estática con un catálogo de juegos de mesa. Las fichas y sus datos están en `js/games.js`; el renderizado y la búsqueda, en `js/script.js`; los estilos, en `css/styles.css`.

## Imágenes de los juegos

Guarda las portadas en `img/` y nómbralas con el ID del juego en BoardGameGeek.

- Si la imagen es WebP, usa el formato `<ID>.webp`. No hace falta modificar JavaScript: la web lo busca automáticamente.
- Si tiene otra extensión, añade una entrada al objeto `imageFiles` de `js/script.js`. La clave es la ID de BoardGameGeek y el valor, el nombre del archivo dentro de `img/`.
- Si el nombre del archivo no coincide exactamente con la ID, usa igualmente `imageFiles` para indicar el nombre real.

Por ejemplo, para una imagen `82222.png` del juego con ID `82222`:

```js
const imageFiles = {
  82222: "82222.png",
};
```

La entrada debe estar dentro del objeto `imageFiles` ya existente; no reemplaces el objeto completo si contiene otras excepciones. Asegúrate de que el nombre, las mayúsculas y la extensión coincidan con el archivo. Las imágenes se cargan de forma diferida (`loading="lazy"`) al acercarse a la zona visible de la página.
