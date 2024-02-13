let dogsList = []
let isOn = false

const toggleBadOrGood = (animal) => {
  return animal.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
}

const renderDog = dog => {
  const span = document.createElement('span')
  span.textContent = dog.name
  document.querySelector('div#dog-bar').append(span)
  
  span.addEventListener('click', () => {
    const divInfo = document.querySelector('div#dog-info')
    divInfo.innerHTML = ''
    const goodOrBad = toggleBadOrGood(dog)
    const div = document.createElement('div')
    div.innerHTML = `
      <img src='${dog.image}'/>
      <h2>${dog.name}</h2>
      <button>${goodOrBad}</button>
    `
    divInfo.appendChild(div)
    divInfo.querySelector('button').addEventListener('click', e => {
      dog.isGoodDog = !dog.isGoodDog
      fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dog)
      }).then(res => res.json())
      .then(dog => console.log(dog))
      
      e.target.textContent = toggleBadOrGood(dog)
    })
  })
}

const filterDogs = dogs => {
  const filterBtn = document.querySelector('#good-dog-filter')
  filterBtn.addEventListener('click', () => {
    isOn = !isOn
    if(isOn) {
      const goodDogs = dogs.filter(dog => dog.isGoodDog)
      filterBtn.textContent = 'Filter good dogs: ON'
      document.querySelector('div#dog-bar').innerHTML = ''
      goodDogs.forEach(dog => renderDog(dog))
    } else {      
      filterBtn.textContent = 'Filter good dogs: OFF'
      document.querySelector('div#dog-bar').innerHTML = ''
      dogs.forEach(dog => renderDog(dog))
    }    
  })
}

const getAllDogs = () => {
  fetch('http://localhost:3000/pups').then(res => res.json())
  .then(dogs => {
    dogs.forEach(dog => renderDog(dog))
    filterDogs(dogs)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()
})
