const PIXABAY_API_KEY = "58197628-d5c73522a14de7db903e41391";
const inventario = [
    {
        id: 1,
        nombre: "Pro Bell N2031",
        precio: 87599,
        categoria: "Laptops",
        desc: "Potente laptop para gaming",
        stock: 10,
        query: "computadora portátil",
    },
    {
        id: 2,
        nombre: "Humanware Lite 2028",
        precio: 9999,
        categoria: "Laptops",
        desc: "Ligera y perfecta para estudiantes",
        stock: 5,
        query: "laptop",
    },
    {
        id: 3,
        nombre: "Renobo XYZ 2030",
        precio: 32799,
        categoria: "Laptops",
        desc: "Grosor mínimo, máximo poder",
        stock: 0,
        query: "ultrabook",
    },
    {
        id: 5,
        nombre: "InteliFon C28",
        precio: 34599,
        categoria: "Teléfonos",
        desc: "Cámara de 200MP",
        stock: 15,
        query: "smartphone",
    },
    {
        id: 6,
        nombre: "AyFono 29 Pro Max Deluxe Limited Edition",
        precio: 45999,
        categoria: "Teléfonos",
        desc: "Lo de siempre",
        stock: 0,
        query: "iphone",
    },
    {
        id: 7,
        nombre: "Classic Phone 2K Edition",
        precio: 23499,
        categoria: "Teléfonos",
        desc: "De la vieja escuela",
        stock: 8,
        query: "old phone",
    },
    {
        id: 9,
        nombre: "6SX-SVN7 Noise-Cancelling",
        precio: 1199,
        categoria: "Audio",
        desc: "Aislamiento total del sonido",
        stock: 0,
        query: "headphones",
    },
    {
        id: 10,
        nombre: "In-Ear Buzz I30",
        precio: 769,
        categoria: "Audio",
        desc: "Compactos y resistentes al agua",
        stock: 30,
        query: "earbuds",
    },
    {
        id: 11,
        nombre: "Nelson FAX1K Bluetooth",
        precio: 1729,
        categoria: "Audio",
        desc: "Sonido envolvente 360°",
        stock: 0,
        query: "bluetooth speaker",
    },
    {
        id: 12,
        nombre: "Podcast 10K Pro",
        precio: 2299,
        categoria: "Audio",
        desc: "Condensador de alta fidelidad",
        stock: 12,
        query: "microphone",
    },
    {
        id: 13,
        nombre: 'Pearpple 4K 27"',
        precio: 16999,
        categoria: "Monitores",
        desc: "Colores precisos para creativos",
        stock: 7,
        query: "monitor",
    },
    {
        id: 15,
        nombre: "USB-C 2027 Sungsam Monitor",
        precio: 11499,
        categoria: "Monitores",
        desc: "Extiende tu pantalla en viajes",
        stock: 15,
        query: "portable",
    },
    {
        id: 8,
        nombre: "Camera HD Ultra Zoom Dokak 2018",
        precio: 4799,
        categoria: "Otros",
        desc: "Batería para todo el día",
        stock: 20,
        query: "cámara",
    },
    {
        id: 17,
        nombre: "Renobo Mechanical Keyboard 1970 Collection Edition",
        precio: 38699,
        categoria: "Otros",
        desc: "Nunca se olvidan",
        stock: 25,
        query: "mechanical keyboard",
    },
    {
        id: 4,
        nombre: "Gaming Station",
        precio: 126999,
        categoria: "Otros",
        desc: "Estación gamer para divertirse",
        stock: 3,
        query: "gaming pc",
    },
    {
        id: 18,
        nombre: "Ergonomic Mouse Renovo S25",
        precio: 999,
        categoria: "Otros",
        desc: "Previene la fatiga en la muñeca",
        stock: 0,
        query: "ergonomic mouse",
    },
    {
        id: 20,
        nombre: "Hub USB-C Bell Revolution 2029",
        precio: 439,
        categoria: "Otros",
        desc: "7 puertos en 1",
        stock: 20,
        query: "usb-c hub",
    },
];
let carrito = [];
const categorias = ["Todas", ...new Set(inventario.map((p) => p.categoria))];
const CatalogoModulo = (async () => {
    const cargarImagenes = async () => {
        for (let prod of inventario) {
            try {
                const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(prod.query)}&image_type=photo&per_page=3`;
                const respuesta = await fetch(url);
                const datos = await respuesta.json();
                if (datos.hits && datos.hits.length > 0) {
                    prod.img = datos.hits[0].webformatURL;
                }
            } catch (e) {
                console.warn(`Error al cargar imagen para ${prod.nombre}`);
            }
        }
    };
    const renderizarCategorias = () => {
        const contenedor = document.getElementById("contenedor_filtros");
        contenedor.innerHTML = categorias
            .map(
                (cat) =>
                    `<button class="boton_secundario filtro_btn ${cat === "Todas" ? "activo" : ""}" data-categoria="${cat}">${cat}</button>`,
            )
            .join("");
        document.querySelectorAll(".filtro_btn").forEach((btn) => {
            btn.addEventListener("click", (e) =>
                filtrarProductos(e.target.dataset.categoria, e.target),
            );
        });
    };
    const renderizarProductos = (productos) => {
        const grid = document.getElementById("grid_productos");
        document.getElementById("resultados_info").textContent =
            `Mostrando ${productos.length} productos`;
        grid.innerHTML = productos
            .map(
                (p) => `
            <div class="tarjeta_interactiva">
                ${p.stock === 0 ? '<span class="etiqueta_agotado">AGOTADO</span>' : ""}
                <img src="${p.img || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><rect width='100%' height='100%' fill='%23eee'/></svg>"}" alt="${p.nombre}" class="producto_img">
                <div class="producto_info">
                    <h4>${p.nombre}</h4>
                    <span class="precio">$${p.precio.toFixed(2)}</span>
                    <p class="desc">${p.desc}</p>
                    <button class="boton_primario boton_agregar" 
                            onclick="agregarAlCarrito(${p.id})" 
                            ${p.stock === 0 ? "disabled" : ""}>
                        ${p.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                    </button>
                </div>
            </div>
        `,
            )
            .join("");
    };
    const filtrarProductos = (categoria, botonActivo) => {
        document
            .querySelectorAll(".filtro_btn")
            .forEach((b) => b.classList.remove("activo"));
        botonActivo.classList.add("activo");
        const filtrados =
            categoria === "Todas"
                ? inventario
                : inventario.filter((p) => p.categoria === categoria);
        renderizarProductos(filtrados);
    };
    window.agregarAlCarrito = (id) => {
        const producto = inventario.find((p) => p.id === id);
        if (producto.stock > 0) {
            carrito.push(producto);
            actualizarCarritoUI();
            mostrarFeedback();
        }
    };
    const actualizarCarritoUI = () => {
        document.getElementById("contador_carrito").textContent =
            carrito.length;
        const contenedorItems = document.getElementById("items_carrito");
        if (carrito.length === 0) {
            contenedorItems.innerHTML = "<p>El carrito está vacío</p>";
            document.getElementById("total_carrito").textContent = "0.00";
            return;
        }
        let total = 0;
        contenedorItems.innerHTML = carrito
            .map((p, index) => {
                total += p.precio;
                return `
                <div class="carrito_item">
                    <span>${p.nombre}</span>
                    <span>$${p.precio.toFixed(2)} <button class="boton_secundario" onclick="eliminarDelCarrito(${index})" style="padding: 2px 6px; font-size: 0.8rem; margin-left: 10px;">X</button></span>
                </div>
            `;
            })
            .join("");
        document.getElementById("total_carrito").textContent = total.toFixed(2);
    };
    window.eliminarDelCarrito = (index) => {
        carrito.splice(index, 1);
        actualizarCarritoUI();
    };
    const mostrarFeedback = () => {
        const toast = document.getElementById("toast_notificacion");
        toast.classList.remove("oculto");
        setTimeout(() => toast.classList.add("oculto"), 3000);
    };
    document
        .getElementById("btn_abrir_carrito")
        .addEventListener("click", () => {
            document.getElementById("modal_carrito").classList.remove("oculto");
        });
    document
        .getElementById("btn_cerrar_carrito")
        .addEventListener("click", () => {
            document.getElementById("modal_carrito").classList.add("oculto");
        });
    document.getElementById("btn_pagar").addEventListener("click", () => {
        if (carrito.length > 0) {
            alert("Gracias por tu compra");
            carrito = [];
            actualizarCarritoUI();
            document.getElementById("modal_carrito").classList.add("oculto");
        } else {
            alert("Agrega productos antes de pagar");
        }
    });
    await cargarImagenes();
    renderizarCategorias();
    renderizarProductos(inventario);
    actualizarCarritoUI();
})();
