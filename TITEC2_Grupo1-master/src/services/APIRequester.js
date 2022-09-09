
// IP: 10.150.45.137


async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;
  
  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: abortController.signal  
  });
  clearTimeout(id);
  return response;
}

function getTalleres() {
  //El manejo de error en respuesta lo podemos hacer más tarde con reject --> tenemos documentacion
  let dataTalleres = new Promise((resolve, reject) => {
    fetchWithTimeout("http://10.100.6.6:3000/api/talleres", { timeout: 2000}).then(res => {
      res.json().then(obj => {
        resolve(obj);
      })
    }, err => { //en caso de error del fetch o por timeout
      reject("No se pueden obtener los talleres");
    })
  })

  return { talleres: wrapPromise(dataTalleres) };
};


function getDetallesTaller(id) { // TENEMOS QUE VER COMO PASARLE EL ID
  let dataDetallesTaller = new Promise((resolve) => {
    fetch("http://10.100.6.6:3000/api/detalles/" + id).then(res => {
      res.json().then(obj => {
        resolve(obj);
      })
    })
  })

  return { detallesTaller: wrapPromise(dataDetallesTaller) };
};

async function setDatosPostulacion(datos) { // TENEMOS QUE VER COMO PASARLE EL ID
  const res = await fetch("http://10.100.6.6:3000/api/postulacion", {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: { 'Content-Type': 'application/json' }

  }).catch(function (error) {
    // handle error
    alert("No se ha podido conseguir la informacion, intente nuevamente");
  })
  
  const data = await res.json();

  if(data.errno == 1644){
    alert(data.errmsj);
  }
  if(data.errno == 1062){
    alert("El rut ");
  }

  if(data.res == "rut postulado"){
    alert("Ya postuló a este taller");
  }
  if(data.res == "rut no valido"){
    alert("El rut que usted ingresó no es válido");
  }
  return data;

};



// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise) {
  let status = "pending";
  let result = "";
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}


export { getTalleres, getDetallesTaller, setDatosPostulacion };
