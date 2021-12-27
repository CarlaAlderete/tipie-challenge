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

    const sortHandler = (params)=>{
        if(action[params] === 'asc'){
            setAction({...action, [params]:'des'})
            data.sort((a,b)=>{return a[params].localeCompare(b[params])})
        }else if(action[params] === 'des'){
            setAction({...action, [params]:'none'})
            data.sort((a,b)=>{return b[params].localeCompare(a[params])})
        }else{
            setAction({...action, [params]:'asc'})
            setData([...dataCopie])
        }   
    }

    return(
        <div className='mainHome'>
            <div>
                <h3>Information:</h3>
                <table>
                    <thead>
                        <tr>
                            <th onClick={()=>sortHandler('name')}>Name <i className="fas fa-sort"></i></th>
                            <th onClick={()=>sortHandler('sector')}>Sector <i className="fas fa-sort"></i></th>
                            <th onClick={()=>sortHandler('age')}>Age <i className="fas fa-sort"></i></th>
                            <th onClick={()=>sortHandler('email')}>E-mail <i className="fas fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home