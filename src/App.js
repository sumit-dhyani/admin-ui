import React,{ useEffect,useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';
import Update from './Components/Update';
import Pagination from './Components/Pagination';





const App=() =>  {
  
  const [update,setupdate]=useState(false);
  const [updateuser,setupdateuser] =useState({})
  const [Users,setUsers]=useState([]);
  const [page,setpage]=useState(1)
  const [loading,setloading]=useState(true);
  const [filteredUsers,setfilteredUsers]=useState([]);
  
 const [searchField,setsearchField]=useState("");

 const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage=10
  
  // This will be called only once when the app is started it fetchs records from api
  useEffect(()=>{
    
    function getdata(){
      
      fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then(response=>response.json())
      .then(data=>{
        var newarr=data.map((user)=>{ 
          return {...user,isChecked:false} 
        })
        setUsers(newarr)
        setfilteredUsers(newarr)
        
      setloading(false)}
      )
      .catch((err)=>console.log("something went wrong",err))
    }
    
   
    getdata()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  //This is a hook for react.pagination which tells it how many users to be displayed
  useEffect(() => {
    
    const endOffset = itemOffset + itemsPerPage;
    
    setCurrentItems((filteredUsers.slice(itemOffset, endOffset)));
    
    setPageCount(Math.ceil(filteredUsers.length / itemsPerPage));
    
  }, [itemOffset, itemsPerPage,filteredUsers]);

  //Used a react hook here . It will be called automatically as soon as the searchfield is changed.
  useEffect(()=>{
      
      function getlist(){
        // if (searchField!==''){
        
        setfilteredUsers(Users.filter(user=>{
          return user.name.toLowerCase().includes(searchField.toLowerCase())||user.role.toLowerCase().includes(searchField.toLowerCase())||user.email.toLowerCase().includes(searchField.toLowerCase())
        
        }))
        setItemOffset(0)
        setpage(1)
        
      // }
      // else{
      //   // setItemOffset((event.selected * itemsPerPage) % filteredUsers.length)
      //   setItemOffset((page-1)*10)
      // }
      }
      getlist()
      console.log("searchfield")
      // eslint-disable-next-line
    },[searchField])
  
  //to handle checkbox function for selected users or all in a page if selected
  const checkboxchange=(e)=>{

        const { name, checked} =e.target;
        if(name==="allselect"){
            let newar=filteredUsers
            for(let i=0;i<currentItems.length;i++){
              newar=newar.map(user=>{
                if (currentItems[i].name===user.name){
                  return {...user,isChecked:checked}
                }
                else{
                  return user
                }
              })
            }
            setUsers(newar)
            setfilteredUsers(newar)
            
        }
        else{
          let tempUser = filteredUsers.map((user)=>
          user.name===name? {...user,isChecked:checked} :user);
          setUsers(tempUser)
          setfilteredUsers(Users)
        }
      }
      

  // This function responds to page clicks and set new elements to be displayed
  const paginate = (number)=>{
    setpage(number)
    console.log(page,"page")
    setItemOffset(((number-1) * itemsPerPage) % filteredUsers.length)
    
    
  }
  
  //function to delete single item by using delete icon
  const Delete=(email)=>{
    var filtered=Users.filter(user=>(
      (user.email.toLowerCase()!==email.toLowerCase())?
      user
      :console.log("User deleted:",user.name)
      
    ))
    setfilteredUsers(filtered)
    setUsers(filtered)
    
  }
  const pagechange=(e)=>{
    if(e.target.value==="first"){
      setItemOffset(0)
      setpage(1)
    }
    if(e.target.value==='previous'){
     if(itemOffset>=10){
      console.log(itemOffset)
      setItemOffset(itemOffset-itemsPerPage)
      setpage(page-1)
    }
    }
    if(e.target.value==='next'){
      if(itemOffset<=(pageCount-2)*itemsPerPage){
       console.log(itemOffset)
       setItemOffset(itemOffset+itemsPerPage)
       setpage(page+1)
      }
     }
    if(e.target.value==="last"){
      setItemOffset((pageCount-1)*10)
      setpage(pageCount)
    }
  }
  // Function to delete all selected elements at once.
  const Ondeleteall=()=>{
    const newarr=filteredUsers.filter(user=>user.isChecked!==true)
    setUsers(newarr)
    console.log(Users)
    setfilteredUsers(newarr)
    
  }
  
  if (update){
    return(
      <div className="container">
        <div className='row '>
          <div className='col-12'>
      <Update setupdate={setupdate} setfilteredUsers={setfilteredUsers} setUsers={setUsers} filteredUsers={filteredUsers} updateuser={updateuser}/>
      </div>
      </div>
      </div>
    )
  }
  else{
  return (
      <div className="container" >
        <div className='row'>
          <div className='col-12'>
        <Header 
        data={currentItems} 
        setsearchField={setsearchField} 
        checkboxchange={checkboxchange}
        loading={loading} />
        <Card  
        data={currentItems} 
        loading={loading} 
        onDelete={Delete} 
        setupdate={setupdate} 
        checkboxchange={checkboxchange} 
        setupdateuser={setupdateuser} />
        
        <div className='container mt-2'>
        <div className='row'>
            {/* <div className='col-4 mt-2'> */}
            <button type="button"  onClick={()=>Ondeleteall()} className="btn btn-secondary my-3 col-sm-12 col-md-4  mt-2" style={{borderRadius:'20px'}}>Delete Selected</button>
            {/* </div> */}
            
            <ul className='col-sm-12 col-md-8 pagination mt-2 d-flex justify-content-center flex-wrap'>
                <li className='page-item link  ' onClick={pagechange}><button className='page-link mx-2 rounded-circle bg-info text-white  '  value="first">&#60;&#60;</button>	</li>
                <li  className='page-item link' ><button name="hi" className='page-link rounded-circle mx-2 bg-info text-white' value="previous" onClick={pagechange}>&#60;</button>	</li>
                {/* <div className='container'>
                  <div className=''> */}
                  <Pagination 
                selected={page}
                pages={pageCount} 
                paginate={paginate}/>
                    {/* </div></div> */}
                <li className='page-item link'><button className='page-link rounded-circle mx-2 bg-info text-white ' value="next" onClick={pagechange}>&#62;</button>	</li>
                <li className='page-item link' onClick={pagechange}><button className='page-link rounded-circle mx-2 bg-info text-white' value="last">&#62;&#62;</button>	</li>
            </ul>
      </div>
      </div></div>
      </div>
    </div>
  );
  }
}

export default App;
