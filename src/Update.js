import React from 'react';

const Update = () => {
    return (
        <div className='container justify-content-center mx-6 align-items-center'>
        <form className='p-5'>
            <div className="row mb-3">
                <label  className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-4">
                <input type="text" className="form-control" id="inputEmail3"/>
                </div>
            </div>
            <div className="row mb-3">
                <label  className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-4">
                <input type="password" className="form-control" id="inputPassword3"/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Role</label>
                <div className="col-sm-4">
                <input type="text" className="form-control" id="inputPassword3"/>
                </div>
            </div>
            
            <button  className="btn btn-primary">Update Changes</button>
            </form>
            </div>
    );
};

export default Update;