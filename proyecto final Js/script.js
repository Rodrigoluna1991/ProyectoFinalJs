
const cubiertas = [

    {
        id: 1,
        marca: "GoodYear",
        medida: "Medidas = 195-60-15",
        precio: 150000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 2,
        marca: "GoodYear",
        medida: "Medidas = 195-65-14",
        precio: 140000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 3,
        marca: "GoodYear",
        medida: "Medidas = 195-55-15",
        precio: 145000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 4,
        marca: "GoodYear",
        medida: "Medidas = 195-55-14",
        precio: 155000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 5,
        marca: "GoodYear",
        medida: "Medidas = 185-60-14",
        precio: 145000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 6,
        marca: "GoodYear",
        medida: "Medidas = 185-55-15",
        precio: 130000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 7,
        marca: "GoodYear",
        medida: "Medidas = 195-60-15",
        precio: 120000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 8,
        marca: "GoodYear",
        medida: "Medidas = 175-55-13",
        precio: 150000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 9,
        marca: "GoodYear",
        medida: "Medidas = 205-60-14",
        precio: 180000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },
    {
        id: 10,
        marca: "GoodYear",
        medida: "Medidas = 185-65-15",
        precio: 130000,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRnA4h_u3emRarXiWqcnuDx3oBqyTyUrrAzA&s"

    },


];

const sumaCarritoElement = document.getElementById("sumaCarrito");
const cuentaCarritoElement = document.getElementById("cuentaCarrito");
const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

function mostrarTarjetasIndex(cubiertas) {
    const contenedorTarjetas = document.getElementById("productos-container");
    contenedorTarjetas.innerHTML = ""; 

    cubiertas.forEach(producto => {
        const nuevaCubierta = document.createElement("div");
        nuevaCubierta.className = "tarjeta-cubierta";
        nuevaCubierta.innerHTML = `
            <img src="${producto.img}" alt="${producto.marca}">
            <h3>${producto.marca}</h3>
            <p>${producto.medida}</p>
            <p>$$ ${producto.precio}</p>
            <button>Agregar al Carrito</button>
        `;

        contenedorTarjetas.appendChild(nuevaCubierta);

        
        const botonAgregar = nuevaCubierta.querySelector("button");
        botonAgregar.addEventListener("click", () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1500
            });
            agregarCarrito(producto);
            actualizarSumaCarrito(); 
            
        });
    });
}


function mostrarProductosEnCarrito() {
    const carritoContainer = document.getElementById("cart-container");
    carritoContainer.innerHTML = "";
    const productosEnCarrito = JSON.parse(localStorage.getItem("cubiertas")) || [];

    if (productosEnCarrito.length > 0) {
        productosEnCarrito.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.innerHTML = `
                <div>
                    <h2>${producto.medida}</h2>
                    <p>Precio: $${producto.precio}</p>
                    <button class="restar" data-id="${producto.id}"> - </button>
                    <span class="sumaCuentaCarrito" data-id="${producto.id}">${producto.cantidad}</span>
                    <button class="sumar" data-id="${producto.id}"> + </button>
                </div>
            `;

            carritoContainer.appendChild(productoDiv);

           
            const restarBtn = productoDiv.querySelector(".restar");
            restarBtn.addEventListener("click", () => {
                restarAlCarrito(producto);
                actualizarCantidadSpan(producto); 
                mostrarProductosEnCarrito(); 
            });

            
            const sumarBtn = productoDiv.querySelector(".sumar");
            sumarBtn.addEventListener("click", () => {
                agregarCarrito(producto);
                actualizarCantidadSpan(producto); 
                mostrarProductosEnCarrito(); 
            });
        });
    } else {
        carritoContainer.innerHTML = "<p> El carrito esta vacio </p>";
    }

    actualizarSumaCarrito(); 
}


function agregarCarrito(producto) {
    console.log("Producto agregado al carrito:", producto);
    let memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];
    const indiceProducto = memoria.findIndex(cubierta => cubierta.id === producto.id);

    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
    } else {
        memoria[indiceProducto].cantidad++; 
    }

    localStorage.setItem("cubiertas", JSON.stringify(memoria));
    console.log("Memoria actualizada:", memoria);

    actualizarCantidadSpan(producto); 
    actualizarSumaCarrito(); 
}


function mostrarProductosEnCarrito() {
    const carritoContainer = document.getElementById("cart-container");

    if (!carritoContainer) {
        console.error("El contenedor del carrito no se encuentra en el DOM.");
        return;
    }

    carritoContainer.innerHTML = "";
    const productosEnCarrito = JSON.parse(localStorage.getItem("cubiertas")) || [];

    if (productosEnCarrito.length > 0) {
        productosEnCarrito.forEach(producto => {
            console.log("Producto:", producto); 
            const productoDiv = document.createElement("div");
            productoDiv.innerHTML = `
                <div>
                    <h2>${producto.medida || 'Medida no disponible'}</h2>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Precio: $${producto.precio}</p>
                    <button class="restar" data-id="${producto.id}"> - </button>
                    <span class="sumaCuentaCarrito" data-id="${producto.id}">${producto.cantidad}</span>
                    <button class="sumar" data-id="${producto.id}"> + </button>
                </div>
            `;
            carritoContainer.appendChild(productoDiv);
        });

        
        document.querySelectorAll(".restar").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                const producto = JSON.parse(localStorage.getItem("cubiertas")).find(p => p.id == id);
                restarAlCarrito(producto);
            });
        });

        document.querySelectorAll(".sumar").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                const producto = JSON.parse(localStorage.getItem("cubiertas")).find(p => p.id == id);
                agregarCarrito(producto);  
                actualizarCantidadSpan(producto);  
                mostrarProductosEnCarrito();  
            });
        });
    } else {
        carritoContainer.innerHTML = "<p>El carrito esta vacio</p>";
    }

    
    actualizarEstadoBotonComprar();
}


function restarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];
    const indiceProducto = memoria.findIndex(cubierta => cubierta.id === producto.id);

    if (indiceProducto !== -1) {
        memoria[indiceProducto].cantidad--;
        if (memoria[indiceProducto].cantidad === 0) {
            memoria.splice(indiceProducto, 1);
        }
        localStorage.setItem("cubiertas", JSON.stringify(memoria));

        
        actualizarCantidadSpan(producto);

        
        actualizarNumeroCarrito();
        mostrarProductosEnCarrito(); 
    }
}


function getNuevoProductoParaMemoria(producto) {
    return {
        id: producto.id,
        medida: producto.medida,
        precio: producto.precio,
        cantidad: 1
    };
}

function actualizarNumeroCarrito() {
    let cuenta = 0;
    try {
        const memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];

        
        memoria.forEach(producto => {
            cuenta += producto.cantidad;
        });
    } catch (error) {
        console.error("Error al actualizar el número de carrito:", error);
        
    }

    
    const sumaCarritoElement = document.getElementById("sumaCarrito");
    if (sumaCarritoElement) {
        sumaCarritoElement.innerText = cuenta;
    }
}


function reiniciarCarrito() {
    console.log("Reiniciando carrito...");
    localStorage.removeItem("cubiertas");
    const carritoContainer = document.getElementById("cart-container");
    if (carritoContainer) {
        carritoContainer.innerHTML = "";
    }
    actualizarNumeroCarrito();
    actualizarEstadoBotonComprar();
}


document.addEventListener("DOMContentLoaded", () => {
    if (document.location.pathname.includes("index.html")) {
        console.log("Mostrando productos en la página principal...");
        mostrarTarjetasIndex(cubiertas); 
    } else if (document.location.pathname.includes("carrito.html")) {
        mostrarProductosEnCarrito(); 
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const comprarBtn = document.getElementById("comprarBtn");
    
    if (comprarBtn) {
      comprarBtn.addEventListener("click", () => {
        let memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];
        let totalProductos = 0;
        let totalPrecio = 0;

        memoria.forEach(producto => {
          totalProductos += producto.cantidad;
          totalPrecio += producto.precio * producto.cantidad;
        });

        Swal.fire({
          title: "Desea realizar la compra??",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si! Comprar!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Compra finalizada",
              text: `Has comprado ${totalProductos} productos por un total de $${totalPrecio.toFixed(2)}.`,
              icon: "success"
            });

            reiniciarCarrito();
          }
        });
      });
    }
});

  function actualizarEstadoBotonComprar() {
    const comprarBtn = document.getElementById("comprarBtn");
    const productosEnCarrito = JSON.parse(localStorage.getItem("cubiertas")) || [];
  
    if (productosEnCarrito.length > 0) {
      comprarBtn.disabled = false; 
    } else {
      comprarBtn.disabled = true; 
    }
  }

  function agregarCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];
    const indiceProducto = memoria.findIndex(cubierta => cubierta.id === producto.id);

    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
    } else {
        memoria[indiceProducto].cantidad++;
    }

    localStorage.setItem("cubiertas", JSON.stringify(memoria));

    actualizarNumeroCarrito();
}

function actualizarCantidadSpan(producto) {
    const cantidadSpan = document.querySelector(`.sumaCuentaCarrito[data-id="${producto.id}"]`);
    if (cantidadSpan) {
        const memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];
        const indiceProducto = memoria.findIndex(cubierta => cubierta.id === producto.id);

        if (indiceProducto !== -1) {
            cantidadSpan.innerText = memoria[indiceProducto].cantidad;  
        }
    } else {
        console.warn("No se pudo encontrar el span para actualizar la cantidad.");
    }
}

function actualizarNumeroCarrito() {
    let cuenta = 0;
    try {
        const memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];

        memoria.forEach(producto => {
            cuenta += producto.cantidad;
        });
    } catch (error) {
        console.error("Error al actualizar el número de carrito:", error);
    }

    const sumaCarritoElement = document.getElementById("sumaCarrito");
    if (sumaCarritoElement) {
        sumaCarritoElement.innerText = cuenta;
    }
}

function actualizarEstadoBotonComprar() {
    const comprarBtn = document.getElementById("comprarBtn");
    if (comprarBtn) {
        const memoria = JSON.parse(localStorage.getItem("cubiertas")) || [];
        const hayProductos = memoria.length > 0;
        comprarBtn.disabled = !hayProductos;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reiniciarBtn = document.getElementById("reiniciarBtn");

    if (reiniciarBtn) {
        reiniciarBtn.addEventListener("click", () => {
            reiniciarCarrito();
        });
    }
    actualizarNumeroCarrito();
    actualizarEstadoBotonComprar();
});
