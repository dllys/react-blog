/* eslint-disable */

import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function App() {
  let [title, setTitle] = useState([]);
  let [detail, setDetail] = useState([]);
  let [like, setLike] = useState([0,0,0,0,0,0,0,0]);
  let [modal, setModal] = useState(false);
  let [post, setPost] = useState(false);
  let [h, setH] = useState(0);
  let [valueT, setValueT] = useState('');
  let [valueD, setValueD] = useState('');
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  let date = `${year}-${month}-${day}`;

  return (
    <div className="App">
      <div className="all">
        <div className="title">
          <h4 className="sub">ReactBlog</h4>
        </div>

        <button className="btn write" onClick={ () => {
          setPost(!post);
        }}><FontAwesomeIcon icon={faPen} size="2x" color="#7285BD"/>
        </button>

        <button className="btn sort" onClick={ () => {
          let abc = [...title];
          abc.sort();
          setTitle(abc);
        }}><FontAwesomeIcon icon={faSort} size="2x" color="#7285BD"/>
        </button>


        {
          post == true ? <Post 
            setPost={setPost} 
            valueT={valueT}
            setValueT={setValueT}
            valueD={valueD}
            setValueD={setValueD}
            post={post} 
            detail={detail}
            setDetail={setDetail} 
            setTitle={setTitle} 
            title={title} /> : null
        }

        {
          title.map(function(a, i){

            return (
              <div className="post-list" key={i}>
                <div className="list">
                  <h4 onClick={ () => {setModal(!modal); setH(i)}}>{ title[i] }</h4>
                  <p className="date">{date}</p>
                  <span onClick={ () => {
                      let copy = [...like];
                      copy[i] += 1;
                      setLike(copy) 
                  }}><FontAwesomeIcon icon={faHeart} color="#7285BD"/> 
                  </span>  { like[i] }
                  <button className="del" onClick={ () => {
                    let del = [...title];
                    del.splice(i, 1);
                    setTitle(del);
                  }}><FontAwesomeIcon icon={faDeleteLeft} size="2x" color="#7285BD"/></button>
                </div>
              </div>
            )
          })
        }
        
        {
          modal == true ? <Modal setModal={setModal} modal={modal} date={date} h={h} detail={detail} title={title} /> : null
        }

      </div>
    </div>
  );
}

function Post(props) {
  return (
    <div className="form">
          <h3>New Post!</h3>
          <input className="title-input" onChange={ (e) => { props.setValueT(e.target.value) }} />
          <textarea className="detail" onChange={ (e) => { props.setValueD(e.target.value) }}></textarea>
          <button className="post" onClick={ () => {
            let addTitle = [...props.title];
            addTitle.unshift(props.valueT);
            props.valueT ? props.setTitle(addTitle) : '';
            let addDetail = [...props.detail];
            addDetail.unshift(props.valueD);
            props.valueD ? props.setDetail(addDetail) : '';
            props.setPost(!props.post);
          }}>POST</button>
          <span onClick={ () => {{props.setPost(!props.post)}} }>
            <FontAwesomeIcon icon={faCircleXmark} size="2x" color="#7285BD"/>
          </span>
          
    </div>
  )
}

function Modal(props) {
  return (
    <div className="modal">
        <h4>{ props.title[props.h] }</h4>
        <p className="modal-date">{ props.date }</p>
        <p>{ props.detail[props.h] }</p>
        <span onClick={ () => {{props.setModal(!props.modal)}} }>
          <FontAwesomeIcon icon={faCircleXmark} size="2x" color="#7285BD"/>
        </span>
    </div>
  )
}

export default App;
