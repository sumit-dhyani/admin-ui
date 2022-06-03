import React,{ useEffect,useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';
import ReactPaginate from 'react-paginate'
import Update from './Components/Update';


// import Pagination from './Components/Pagination';


const App=() =>  {
  const [update,setupdate]=useState(false);
  const [updateuser,setupdateuser] =useState({})
  const [Users,setUsers]=useState([]);
  // const[currentpage,setcurrentpage]=useState(1)
  const [loading,setloading]=useState(true);
  const [filteredUsers,setfilteredUsers]=useState([]);
  
 const [searchField,setsearchField]=useState("");
//  const postsPerPage=10;
 const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage=10
  
  useEffect(()=>{
    
    function getdata(){
      
      fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then(response=>response.json())
      .then(data=>{
        var newarr=data.map((user)=>{ 
          return {...user,isChecked:false} 
        })
        console.log(newarr)
        setUsers(newarr)
        
        
      setloading(false)}
      )
      .catch((err)=>console.log("something went wrong",err))
    }
    
   
    getdata()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems((filteredUsers.slice(itemOffset, endOffset)));
    
    setPageCount(Math.ceil(filteredUsers.length / itemsPerPage));
    
  }, [itemOffset, itemsPerPage,filteredUsers]);

  
  useEffect(()=>{
    function getlist(){
      setfilteredUsers(Users.filter(user=>{
        return user.name.toLowerCase().includes(searchField.toLowerCase())||user.role.toLowerCase().includes(searchField.toLowerCase())||user.email.toLowerCase().includes(searchField.toLowerCase())
      }))
    
    }
    getlist()
  },[searchField,Users])
  
  const checkboxchange=(e)=>{

    const { name, checked} =e.target;
    let newObj=[]
    // console.log(name,checked)
    if(name==="allselect"){
    let tempUser=currentItems.map((user)=>{
      newObj.push(user.name)
      return {...user, isChecked: checked}
    })
    let newar=filteredUsers
    for(let i=0;i<newObj.length;i++){
      newar=newar.filter(user=>user.name!==newObj[i])
    }
    // console.log("newar",newar)
    // console.log("concat",tempUser.concat(newar))


    // console.log(newar)
    // console.log('combined',combined)
    // console.log("tempuser",tempUser)
    setfilteredUsers(tempUser.concat(newar))
    }
    else{
    let tempUser = filteredUsers.map((user)=>
    user.name===name? {...user,isChecked:checked} :user);
    
    
    setfilteredUsers(tempUser)
    
    }
}


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    
  };

  
  
  
  const Delete=(email)=>{
    console.log(email)
    setfilteredUsers(filteredUsers.filter(user=>(
      (user.email.toLowerCase()!==email.toLowerCase())?
      user
      :console.log("deleting this user",user)
      
    )))
    console.log(filteredUsers)
    
  }
  const Ondeleteall=()=>{
    
    setfilteredUsers(filteredUsers.filter(user=>user.isChecked!==true))
    
  }
  if (update){
    return(
      <Update setupdate={setupdate} setfilteredUsers={setfilteredUsers} filteredUsers={filteredUsers} updateuser={updateuser}/>
    )
  }
  else{
  return (
      <div className="container">
        
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
            <div className='col-4 mt-2'>
            <button type="button" onClick={()=>Ondeleteall()} className="btn btn-secondary" style={{borderRadius:'20px'}}>Delete Selected</button>
            </div>
            
          
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={'col-8 pagination mt-2'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link rounded-circle mx-2'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link rounded-circle mx-2'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link rounded-circle mx-2'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link rounded-circle mx-2'}
        activeClassName={'active'}

      />
      </div>
      </div>
      </div>
      
    
  );
  }
}

export default App;
