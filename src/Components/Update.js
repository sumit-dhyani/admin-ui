import React, { useEffect, useState } from 'react';

const Update = ({setupdate,setfilteredUsers,filteredUsers,updateuser}) => {
    const [name,setname]=useState()
    const [emailnew,setemailnew]=useState()
    const [role,setrole]=useState()
    useEffect(()=>{
        setname(updateuser.name)
        setemailnew(updateuser.email)
        setrole(updateuser.role)
        console.log("default")
        //eslint-disable-next-line
    },[])

    const submit=()=>{
        console.log(name,emailnew,role)
        console.log("type",typeof(name))
        setfilteredUsers(filteredUsers.map((user)=>{
            if(user.email===updateuser.email){
                console.log("user",user)
                return {...user,email:emailnew,name:name,role:role}
            } 
            else{
                return user
            }}
            ))
        setupdate(false)
    }

    return (
        <div className="bg-light">
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <span className="navbar-brand mb-2 h1" style={{marginLeft:"100px"}}>Update User Details</span>
            </div>
        </nav>

        <div className='container  min-vh-100 mt-2 p-3 bg-light'>
        
        <div className='row'>
            
            <div className='col'>
            <div className="row mb-3">
                <label  className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-4">
                <input type="text" onChange={(e)=>setname(e.target.value)} className="form-control" id="inputEmail3" value={name||""}/>
                </div>
            </div>
            <div className="row mb-3">
                <label  className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-4">
                <input type="text" onChange={(e)=>setemailnew(e.target.value)}  className="form-control" value={emailnew||""} />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Role</label>
                <div className="col-sm-4">
                <input type="text" onChange={(e)=>setrole(e.target.value)} className="form-control" value={role||""}/>
                </div>
            </div>
            
            <div className='row '>
                <div className='col'>
            <button onClick={()=>{submit()}} className="btn btn-primary">Update Changes</button>
            </div>
            </div>
            </div>
            
            </div>
            </div>
            </div> 
    );
};

export default Update;