import React,{useState} from 'react'

const SearchBox = ({onSearch}) => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validate(search)
    setError(error)
    if (error.length > 0) return;
    onSearch(search);
  }

  //validate search 
  const validate = (title) => {
    if (title.trim().length === 0) return 'Type in something!';
    return '';
  }
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input type="text" onChange={e => setSearch(e.target.value)} className="form-control" placeholder="Search movie title..."/>
            <div className="input-group-append">
              <button className="btn px-3 btn-background"><i className="fa fa-search text-white"></i></button>
            </div>
          </div>
          <p className='error text-danger'>{ error }</p>
        </form>
      </div>
    </div>
  )
}

export default SearchBox