import {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import TravelCard from './TravelCard'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase"
import { collection, getDocs, query } from 'firebase/firestore';

const tCStyle = {
    div: {
        top: '7%',
        position: 'relative',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll',
        flexdirection: 'column',
        width: '50%',
        left: '5%',
        height: '80%',
        backgroundColor: 'rgba(0,0,0,0)',
        border: 'none',
        zIndex: '1',
        display:"grid",
        gridTemplateColumns: "1fr 1fr"
    }
}

export default function MyTravelCardList({bool, filter, todos, toggleTodo, updateTravelCards, searchCountries }) {
  const { currentBruker } = useAuth();
  let cardFilter = filter
  const [todos2, setTodos2] = useState(todos)

  function getUserName(u) {
    const cr = u.split('@')
    const creatorName = cr[0]
    return creatorName
  }

  useEffect (() => {
    async function handleSetTypeRecommended() {
      const mapCountryPoints = await getCountryPoints()
  
      const mapTravelPoints = await getTravelPoints(mapCountryPoints)
    
      let uSortertTodos = todos
      const SortertTodos = [...uSortertTodos].sort((a, b) => mapTravelPoints.get(b.id) - mapTravelPoints.get(a.id))
      setTodos2(SortertTodos)
      return SortertTodos
    }

    async function getTravelPoints(mapCountryPoints) {
    
      const mapTravelPoints = new Map()
      for (let index = 0; index < todos.length; index++) {
        for (let index2 = 0; index2 < todos[index].countries.length; index2++) {
          let country = todos[index].countries[index2]
  
          if (!mapTravelPoints.has(todos[index].id)) {
            mapTravelPoints.set(todos[index].id, 0)
          }
          
          if (mapCountryPoints.has(country)) {
            mapTravelPoints.set(todos[index].id, mapTravelPoints.get(todos[index].id) + mapCountryPoints.get(country))
          } 
        }
      }
      return mapTravelPoints
    }
  
    async function getCountryPoints() {
      const mapCountryPoints = new Map();
    
      const q = query(collection(db, "innlegg"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {            
        if (document.data().userLikes.includes(currentBruker.uid)) {
          const countryArray = document.data().countryArray
          const countryCount = document.data().countryCount
          for (let index = 0; index < countryCount; index++) {
            if (mapCountryPoints.has(countryArray[index])) {
              mapCountryPoints.set(countryArray[index], mapCountryPoints.get(countryArray[index]) + 2) //TODO: her settes poeng
            } else {
              mapCountryPoints.set(countryArray[index], 2) 
            }
          }
        } else {
          const countryArray = document.data().countryArray
          const countryCount = document.data().countryCount
          for (let index = 0; index < countryCount; index++) {
            if (mapCountryPoints.has(countryArray[index])) {
            } else {
              mapCountryPoints.set(countryArray[index], 0)
            }
          }
        }
      });
      return mapCountryPoints
    }

    setTodos2(todos)
    if (cardFilter === 'recommended') {
      handleSetTypeRecommended()
    }
  }, [cardFilter, currentBruker.uid, todos])

    return (
      <Card style={tCStyle.div}>
          {todos2.map(todos => {
          if (cardFilter === 'all' || cardFilter === 'recommended') { //Hvis alle kort skal vises
            return <TravelCard id={todos.id} key={todos.id} toggleTodo={toggleTodo} todo={todos} />
          }
          else if (cardFilter === 'mine') {
            if (todos.creator === getUserName(currentBruker.email)) {
            return <TravelCard bool={bool} id={todos.id} key={todos.id} toggleTodo={toggleTodo} todo={todos} />
            }
            else
              return null
          } 
          else if (cardFilter === 'search' && searchCountries.length > 0) {
            console.log("jeg er her")
            if (searchCountries.length === 1){ //Hvis bare ett land er lagret i søkefeltet
              console.log("bare 1!!")
              let bool = false
              todos.countries.forEach(country => {
                if (searchCountries.includes(country)) {
                  bool = true
                }
              })
              if (bool) {
                return <TravelCard bool={bool} id={todos.id} key={todos.id} toggleTodo={toggleTodo} todo={todos} />
              }
              else
                return null
            }
            else if (searchCountries.length === 2) { //Hvis to land er lagret i søkefeltet
              const first = searchCountries[0]
              const second = searchCountries[1]
              if (todos.countries[0] === first && todos.countries[todos.countries.length-1] === second) {
                return <TravelCard bool={bool} id={todos.id} key={todos.id} toggleTodo={toggleTodo} todo={todos} />
              }
              else
                return null
            }
            else
              return null
          }
          else{ 
            console.log("jeg havner her")
            if (todos.creator === cardFilter) { //Hvis kortene skal filtreres etter bruker
              return <TravelCard bool={bool} id={todos.id} key={todos.id} toggleTodo={toggleTodo} todo={todos} />
            }
            else
              return null
          }
        })}
      </Card>
    )
  }