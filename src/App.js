import React,{ useEffect,useState } from 'react';
import './App.css';
import Card from './Components/Card';
import Header from './Components/Header';
import ReactPaginate from 'react-paginate'
import Update from './Components/Update';





const App=() =>  {
  const [update,setupdate]=useState(false);
  const [updateuser,setupdateuser] =useState({})
  const [Users,setUsers]=useState([]);
  const [page,setpage]=useState(0)
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
        if (searchField!==''){
        setfilteredUsers(Users.filter(user=>{
          return user.name.toLowerCase().includes(searchField.toLowerCase())||user.role.toLowerCase().includes(searchField.toLowerCase())||user.email.toLowerCase().includes(searchField.toLowerCase())
        
        }))
        setItemOffset(0)
      }
      else{
        // setItemOffset((event.selected * itemsPerPage) % filteredUsers.length)
        setItemOffset(page)
      }
      }
      getlist()
      // eslint-disable-next-line
    },[searchField,Users])
  
  //to handle checkbox function for selected users or all in a page if selected
  const checkboxchange=(e)=>{

        const { name, checked} =e.target;
        console.log(name,checked)
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
            setfilteredUsers(newar)
            
        }
        else{
          let tempUser = filteredUsers.map((user)=>
          user.name===name? {...user,isChecked:checked} :user);
          setfilteredUsers(tempUser)
        }
      }
      

  // This function responds to page clicks and set new elements to be displayed
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
    setpage(newOffset)
  };

  
  
  //function to delete single item by using delete icon
  const Delete=(email)=>{
    setfilteredUsers(filteredUsers.filter(user=>(
      (user.email.toLowerCase()!==email.toLowerCase())?
      user
      :console.log("User deleted:",user.name)
      
    )))
    
  }
  // Function to delete all selected elements at once.
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
            pageLinkClassName={'page-link rounded-circle mx-2 bg-info text-white'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link rounded-circle mx-2 bg-info text-white'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link rounded-circle mx-2 bg-info text-white'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link rounded-circle mx-2 bg-info text-white'}
            activeClassName={'active'}
            activeLinkClassName={'bg-dark text-white'}
            />
      </div>
      </div>
    </div>
  );
  }
}

export default App;
