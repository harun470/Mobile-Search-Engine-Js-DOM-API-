// take value from input field
searchItem=()=>{
    const inputField=document.getElementById('inputField')
    const getValue=inputField.value
    if(getValue==''){
        let errorDiv=document.getElementById('error')
        errorDiv.innerHTML=`
        <p> Please enter your desire phone's name </p>
        `
    }else{
        getItemUrl(getValue)
    }
    
    inputField.value=''
}

// retreiving data from url
getItemUrl=(searchText)=>{
    const URL=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(URL)
    .then(response=>response.json())
    .then(data=>displayItem(data.data))
  }


// display phone 
displayItem=(data)=>{
    let moreButtonDiv= document.getElementById('morebutton')
    if(data.length>20){
        moreButtonDiv.innerHTML=`
            <button onclick="showMore('${data[0].brand}')" id="morebutton" style="background-color: #ff007f; color: white; border-radius: 5px; 
            border: 1px solid green; padding: 5px 10px"  >More</button>
        `
        document.getElementById('morebutton').style.display='block'
    }else{
        document.getElementById('morebutton').style.display='none'
    } 
     console.log(data)
    if(data.length==0){
        let errorDiv=document.getElementById('error')
        errorDiv.innerHTML=`
        <p> No match item found </p>
        `
    }else{
        let errorDiv=document.getElementById('error')
        errorDiv.innerHTML=''
        let sliceData= data.slice(0,20)
        let parentDiv=document.getElementById('parentDiv')
        parentDiv.textContent=''
        sliceData.forEach(data=>{
        // console.log(data)
        const div=document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div class="card">
            <img style="padding:15px" src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">${data.brand}</p>
                <p><a href="#singleItem" onclick="singleItem('${data.slug}')" style="background-color: #82b440; color: white; border-radius: 5px; 
                        border: 1px solid green; padding: 5px 10px;text-decoration: none;">Details</a></p>
            </div>
        </div>
        `
        parentDiv.appendChild(div) 
           
    })
    }
    
}


// showmore buttun function

showMore=(data)=>{
    // console.log(data)
    let URL=`https://openapi.programming-hero.com/api/phones?search=${data}`
    fetch(URL)
    .then(response=>response.json())
    .then(data=>displayItem2(data.data))
}

displayItem2=(data)=>{
    let sliceData= data.slice(20)
    // console.log(sliceData)
    let parentDiv=document.getElementById('parentDiv')
    sliceData.forEach(data=>{
        // console.log(data)
        const div=document.createElement('div')
        div.classList.add('col')
        div.innerHTML=`
        <div class="card">
            <img style="padding:15px" src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">${data.brand}</p>
                <p><a href="#singleItem" onclick="singleItem('${data.slug}')" style="background-color: #82b440; color: white; border-radius: 5px; 
                        border: 1px solid green; padding: 5px 10px;text-decoration: none;">Details</a></p>
            </div>
        </div>
        `
        //  console.log(numb)
        parentDiv.appendChild(div)
        let moreButtonDiv= document.getElementById('morebutton')
        document.getElementById('morebutton').style.display='none'  
    })
    
}


// single item

singleItem=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(response=>response.json())
    .then(data=>displaySingleItem(data.data))
}

// display single item

displaySingleItem=(data)=>{
    //  console.log(data)
    let itemList=data.mainFeatures.sensors.join()
    let singleParentDiv=document.getElementById('singleItem')
    singleParentDiv.textContent=''
    const singleDiv=document.createElement('div')
    singleDiv.innerHTML=`
    <div class="card">
        <img style="padding:15px" src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.brand}</p>
            <hr/>
            <p class="fw-bold">Main features</p>
            <p class="card-text">Chipset: ${data.mainFeatures.chipSet}</p>
            <p class="card-text">Display-size: ${data.mainFeatures.displaySize}</p>
            <p class="card-text">Memory: ${data.mainFeatures.memory}</p>
            <p class="card-text">Sensors: ${itemList}</p>
            <p class="card-text">Storage: ${data.mainFeatures.storage}</p>
            <p class="fw-bold">Others</p>
            <p class="card-text">Bluetooth: ${data.others? data.others.Bluetooth:'No data found'}</p>
            <p class="card-text">GPS: ${data.others?data.others.GPS:'No data found' }</p>
            <p class="card-text">NFC: ${data.others?data.others.NFC:'No data found'}</p>
            <p class="card-text">Radio: ${data.others?data.others.Radio:'No data found'}</p>
            <p class="card-text">USB: ${data.others?data.others.USB:'No data found'}</p>
            <p class="card-text">WLAN: ${data.others?data.others.WLAN:'No data found'}</p>
            <p class="card-text">Release-date: ${data.releaseDate? data.releaseDate:'No release date found'}</p>
            <p><a href="#singleItem" onclick="closeSingleItem('${data.slug}')" style="background-color: #ff007f; color: white; border-radius: 5px; 
            border: 1px solid green; padding: 5px 10px; text-decoration: none">Close</a></p>
        </div>
    </div>
    `
    singleParentDiv.appendChild(singleDiv)
}

closeSingleItem=(id)=>{
   document.getElementById('singleItem').textContent=''
 }