import React from 'react';

import {useState} from "react";
//import { setState } from 'react';

import './im999_search_box.css';

export function IM999_Search_Box() {

  //im999 for hiding search box list
  window.addEventListener('click', function(event) {
    //alert('hello window');
    doClickX(false);
  });


  const doClickDivSearch = event =>{
    event.stopPropagation();
  }


  const doClickSearch = event =>{
    //alert('clicked');
    
    doFocusSearch(event);
    event.currentTarget.dispatchEvent(new KeyboardEvent('input', { bubbles: true }));
    
    event.stopPropagation();
  }


  //txtSearch.focus();


  const doGoClick = event =>{
    var txtSearch = document.querySelector('#div-search-im999 input[type="text"]');

    alert(txtSearch.value);
  }


  const doKeyDownSearch = event =>{
    //alert(event.keyCode);
    if(event.keyCode == 40){
        doAction('down');        
    }else if(event.keyCode == 38){
        doAction('up');        
    }else if(event.keyCode == 13){
        doAction('enter');        
    }else if(event.keyCode == 27){
        doAction('esc');        
    }
  }


  const doAction = (keyName) =>{
    var txtSearch = document.querySelector('#div-search-im999 input[type="text"]');
    var currentActive = document.querySelector('.div-search-mid-im999-li-active');
    var divContries = document.getElementById('div-search-mid-im999');
    var lis = document.querySelectorAll('#div-search-mid-im999 ul li');

    if(keyName == 'enter'){
        if(currentActive == null){
            var btnGo = document.querySelector('#div-search-top-im999 button[data-work="Go"]');
            btnGo.click();
        }else{
            currentActive.classList.remove('div-search-mid-im999-li-active');
            //txtSearch.value = currentActive.getAttribute('data-work');
            txtSearch.value = currentActive.outerText;

            txtSearch.dispatchEvent(new KeyboardEvent('input', { bubbles: true }));

        }
        return;
    }else if(keyName == 'esc'){
        if(lis.length == 0){
            //var btnX = document.querySelector('#div-search-top-im999 button[data-work="X"]');
            //btnX.click();
            doClickX(true);
        }else{
            if(currentActive != null){
                currentActive.classList.remove('div-search-mid-im999-li-active');
            }
            doClickX(false);
        }
        return;
    }

    if(lis.length == 0){
        if(keyName == 'down'){
            txtSearch.dispatchEvent(new KeyboardEvent('input', { bubbles: true }));
        }
        return;
    }

    if(currentActive == null){
        if(keyName == 'down'){
            lis[0].classList.add('div-search-mid-im999-li-active');
            divContries.scrollTop = 0;
        }
        return;
    }

    for(var i=0; i<lis.length;i++){
        if(lis[i].classList.contains('div-search-mid-im999-li-active')){
            if(keyName == 'up'){
                if(i==0){
                    lis[lis.length-1].classList.add('div-search-mid-im999-li-active');
                    divContries.scrollTop = divContries.scrollHeight;
                }else{
                    lis[i-1].classList.add('div-search-mid-im999-li-active');
                    divContries.scrollTop = divContries.scrollHeight / lis.length * (i+1) - 80;
                }
            }else if(keyName == 'down'){
                if(i==lis.length-1){
                    lis[0].classList.add('div-search-mid-im999-li-active');
                    divContries.scrollTop = 0;
                }else{
                    lis[i+1].classList.add('div-search-mid-im999-li-active');
                    divContries.scrollTop = divContries.scrollHeight / lis.length * (i+1) - 40;
                }
            }
            currentActive.classList.remove('div-search-mid-im999-li-active');
            //div.scrollTop = currentActive.getBoundingClientRect().height * (i+1);
            //div.scrollTop = 25 * (i+1);
            return;
        }
    }
  }


  const doInputSearch = event => {
    var list = getCountries(true, event.target.value); //im999 when async false

    setDataListCountries(list);
  }


  const doFocusSearch = event => {
    var divSearch = document.querySelector('#div-search-im999');
    divSearch.classList.add('do-blur-search-im999');
  }


  const doBlurSearch = event => {
    var divSearch = document.querySelector('#div-search-im999');
    divSearch.classList.remove('do-blur-search-im999');
  }


  const doClickX = (emptyInput) => {
    setDataListCountries(null);

    if(emptyInput){
        var txtSearch = document.querySelector('#div-search-im999 input[type="text"]');
        txtSearch.value = '';
    }
  }


  const getCountries = (pFlags, pName) => {
    var retList = [];
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://restcountries.com/v3.1/all', false);   //im999 async false 

    xhr.onload = function(){
        if(xhr.status == 200){
            var countries = JSON.parse(this.response);

            //im999 ie11 support
            for(var i=0; i<countries.length; i++){
                var name = countries[i].name.common;
                if(name.toLowerCase().indexOf(pName.toLowerCase())>=0){
                    if(pFlags){
                        retList.push({name:countries[i].name.common, flag:countries[i].flags.png});
                    }else{
                        retList.push({name:countries[i].name.common});
                    }
                }
            }
            //return retList;
        }
    }

    xhr.send();

    retList.sort(function(a, b){
        var A = a.name.toUpperCase();
        var B = b.name.toUpperCase();
        return A.localeCompare(B);
    });

    return retList; //im999 when async false
  }


  const doClickLink = event =>{
    var txtSearch = document.querySelector('#div-search-im999 input[type="text"]');
    txtSearch.value = event.currentTarget.getAttribute('data-work');

    txtSearch.dispatchEvent(new KeyboardEvent('input', { bubbles: true }));
  }


  const [dataListCountries, setDataListCountries] = useState(null); 

  return (

    <div id="div-search-im999" onClick={doClickDivSearch}>
        <div id="div-search-top-im999">
            <input id="txtSearchBox" type="text" title="input search text" onInput={doInputSearch} onBlur={doBlurSearch} onFocus={doFocusSearch} onClick={doClickSearch} onKeyDown={doKeyDownSearch} autoFocus/>
            <button type="button" data-work="Go" onClick={doGoClick}>Go</button>
            <button type="button" data-work="X" onClick={doClickX}>X</button>
        </div>
        <div id="div-search-mid-im999">
          {
            dataListCountries != null ?

              dataListCountries.length == 0 ?

                <span className="not-country">there isn't countries.</span>
              : <ul>
                  {
                    dataListCountries.map((country, index) =>(
                      <li key={index}>
                        <a href="#" onClick={doClickLink} data-work={country.name}>
                          <span>{country.name}</span>
                          <img src={country.flag} title={country.name} alt={country.name}/>
                        </a>
                      </li>
                    ))
                  }
                </ul>
            : []
          }
        </div>
        <div id="div-search-down-im999">
          {
            dataListCountries != null ? 
              <span>Count : {dataListCountries.length}</span>
              : []
          }
        </div>
    </div>
  );
}
