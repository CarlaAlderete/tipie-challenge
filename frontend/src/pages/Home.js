import { useEffect, useState } from 'react'
import axios from 'axios'

const Home = ()=>{
    const [data, setData]= useState([])
    const [dataCopie, setDataCopie]= useState([])
    const [action , setAction] = useState({name:'asc', sector:'asc', age:'asc',email:'asc'})

    useEffect(()=>{
        axios.get('http://localhost:4000/api/payroll')
        .then(res=>{
            if(res.data.success){
                setData(res.data.res)
                setDataCopie([...res.data.res])
            }
        })
    },[])

    const tbody = data.map(obj=>{
        return(
            <tr key={obj.email}>
                <td>{obj.name}</td>
                <td>{obj.sector}</td>
                <td>{obj.age}</td>
                <td>{obj.email}</td>
            </tr>
        )
    })
    console.log(data)
    const sortHandler = (params)=>{
        let auxData = [...data]
        if(action[params] === 'asc'){
            setAction({...action, [params]:'des'})
            auxData.sort((a,b)=>{return a[params].localeCompare(b[params])})
            setData(auxData)
        }else if(action[params] === 'des'){
            setAction({...action, [params]:'none'})
            auxData.sort((a,b)=>{return b[params].localeCompare(a[params])})
            setData(auxData)
        }else{
            setAction({...action, [params]:'asc'})
            setData(dataCopie)
        }   
    }
    return(
        <div className='mainHome'>
            <table>
                <thead>
                    <tr>
                        <th onClick={(e)=>sortHandler('name')}>Name <i className="fas fa-sort"></i></th>
                        <th onClick={(e)=>sortHandler('sector')}>Sector <i className="fas fa-sort"></i></th>
                        <th onClick={(e)=>sortHandler('age')}>Age <i className="fas fa-sort"></i></th>
                        <th onClick={(e)=>sortHandler('email')}>E-mail <i className="fas fa-sort"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        </div>
    )
}

export default Home