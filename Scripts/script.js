let template = document.getElementById('template-card').content;
const coleccion = document.getElementById('coleccionBtn')

coleccion.addEventListener('click', () => {
    pintar();
})

const getData = async () => {
    try {
        const resp = await fetch(" http://localhost:4000/productos");
        const data = await resp.json();
        return data;
    } catch(err) {
        console.error(`Error: ${err}`);
    }
}

const pintar = async() =>{
    const data = await getData();
    let frag = document.createDocumentFragment();
    const container = document.getElementById('containerCard');
    container.innerHTML = ' ';
    data.forEach(element => {
        let {nombre, descripcion, image, precio, talla, id} = element;
        let {url1, url2, url3} = image;
        template.querySelector('.imgProducto').setAttribute('src', url1);
        template.querySelector('.imgProducto').setAttribute('id', id);
        template.querySelector('.nombre').textContent = nombre;
        template.querySelector('.description').textContent = descripcion;
        template.querySelector('span').textContent = precio;
        const clone = template.cloneNode(true);
        frag.append(clone);
    });
    container.append(frag);

    container.addEventListener( 'click', async e => {
        if(e.target.classList.contains('imgProducto')){
            const id = e.target.id
            console.log(id);
            const producto = await pintarDetalle(id);
            console.log(producto);
            pintarModal(producto);

        }
        else{
            e.stopPropagation();
        }
    })
}

const pintarDetalle = async(id) => {
    const Container_modal = document.getElementById('container_modal')
    const data = await getData();
    const traer = await data.filter(element => element.id  == id);
    return traer;
}

const pintarModal = async (producto) =>{
    const card = await producto;
    card.forEach(element => {
        console.log(element);
        let {id, nombre, description, precio, image} = element;
        let {url1, url2, url3} = image;
        container_modal.innerHTML = `
        <div class="container modal-container" >
                        <div class="img">
                            <img src="${url2}" width="100px" height="100px">
                            <img src="${url3}" width="100px" height="100px">
                            <img src="${url1}" width="100px" height="100px">
                        </div>
                        <div class="img-principal">
                            <img src="${url1}" id="${id}">
                        </div>
                        <div class="title">
                            <h2>${nombre}</h2>
                            <p>${precio}</p>
                            <h3>SIZE</h3>
                            <div class="btn-radio">
                                <button class="circle">S</button>
                                <button class="circle">M</button>
                                <button class="circle">L</button>
                                <button class="circle">XL</button>
                                <button class="circle">XL</button>
                            </div>
                            <div class="butons">
                                <button class="btn1">Add to car</button>
                                <button class="btn2">Buy it now</button>
                            </div>
                            <p>${description}</p>
                            <a href="">Click to sizing</a>
                        </div>
                    </div>
        `
         
    })
    // console.log(card);
   
}
 


