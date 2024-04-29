class ColorPanel {
  constructor(href, cArray) {
    this.href = href;
    this.cArray = cArray;
  }
  static choose(i) {
    let panel = cpanels[i];
    document.getElementById('color').href = panel.href;
    window.colorPanel = panel.cArray;
    window.themeNo = i
  }
}

class P {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let light = new ColorPanel('style.css', ['#D0D2EC', '#9B9EB8', '#D2D3E7']);

let dark = new ColorPanel('style2.css', ['#202020', '#2D2D2D', '#232323']);

let cpanels = [light, dark]

window.themeNo = 1;
ColorPanel.choose(0);

class PanelBtn {
  constructor(main, connected, open = false) {
    this.main = main;
    this.connected = connected;
    this.open = open;
    
    if(this.open==true) this.update(1);else
    if(this.open==false) this.update(0);
    
    this.main.onclick = () => {
      if(this.open==true) {
        this.open = false;
        this.update(0);
      } else {
        this.open = true;
        this.update(1);
      }
      
      
    }
    
  }
  
  update(mode) {
    
    let type;
    
    if(mode==0) type = 'none';else
    if(mode==1) type = 'true';
    
    for (let i = 0; i < this.connected.length; i++) {
      let el = this.connected[i];
      el.style = 'display: '+type;
    }
  }
}

class Panel {
  constructor(key, n) {
    this.key = key;
    this.n = n;
  }
  choose(j) {
    for(let i=0;i<this.n;i++) {
      let el = id(this.key+i);
      if(i!==j) {
        el.style = 'display: none';
        id('mhead'+i).style=`
        background-color: `+colorPanel[0]+`;
        font-size: 17px;
        padding-inline: 10px;
        margin-bottom: 2px`

      }
      else {
        el.style = 'display: true';
        id('mhead'+i).style=`
        font-size: 17px;
        padding-inline: 10px;
        margin-bottom: 2px;
        transition: .5s;
        background-color: `+colorPanel[1]+`;color:`+colorPanel[2]

      }
    }
  }
  connect(key,n,finish,funcs = []) {
    for(let i=0;i<n;i++) {
      id(key+i).onclick = () => {
        this.choose(i);
        if(funcs[i]!==undefined) funcs[i]();
        if(finish!==undefined) finish();
      }
    }
  }
}

class Blog {
  constructor(word, head) {
    this.word = word;
    this.head = head;
    this.date = getDate();
    blogs.push(this);
    this.n = blogs.length-1;
    this.range = 100; //view character num
  }
  getWord(mode=0) {
    
    let word = '<div class="box">';
    word+=`<h3 onclick="sendBlog(`+this.n+`, 0)">`+this.head+`</h3>`;
    word+=this.showWord(mode)[0]
    
    if(mode==0&&this.showWord(mode)[1]) word+= `<button class="read_more" onclick="full(this, `+this.n+`)">..readmore</button>`;
    
    word+=`<date2>`+this.date+`</date2>`;
    word+="</div>";
    
    if(mode==1) {
    word+=`
    <div class="panel2">
    <button class="btn" onclick="sendBlog(`+(this.n-1)+`,`+window.homeFrom+`)"><</button>
    <button class="btn" onclick="home()">—</button>
    <button class="btn" onclick="sendBlog(`+(this.n+1)+`,`+window.homeFrom+`)">></button>
    </div>
    `
    }
    return word;
  }
  getTitle() {
    let title = `<div class="writes" id="b`+this.n+`" onclick="sendBlog(`+this.n+`, 1)">`+this.head+`<date>`+this.date+`</date></div>`
    return title;
  }
  
  showWord(mode) {
    //mode: 0(lazy),1(allies)
    //return [word, isEnough big to get a read more btn]
    if(mode==0) {
      
      if(this.word.length>this.range) {
        
        /*let word = '<textarea readonly="true" class="wordC" id="t'+this.n+'">'+this.word.slice(0,this.range)+'</textarea>';*/
        let word = '<text id="t'+this.n+'">'+this.word.slice(0,this.range)+'</text>';
        return [word, true]
        
        
      } else return [this.word, false]
      
    } else return [this.word, false]
  }
  
  getFull() {
    let word = this.word;
    word+='<button class="read_more" onclick="less(this,'+this.n+')">read less</button>'
    return word
  }
}

id = (x) => {return document.getElementById(x)};
qid = (x) => {return document.querySelector(x)};

window.homeFrom = 0;
let editAB = false;

getDate = () => {
  let time = new Date();
  let day = String(time.getDay())
  if (day.length == 1) day = '0' + day;
  let mounth = String(time.getMonth());
  if (mounth.length == 1) mounth = '0' + mounth;
  let year = time.getFullYear();
  let date = day + '.' + mounth + '.' + year;
  return date;
}

sendBlog = (i, homeFrom=0) => {
  //homeFrom: what do you use for acces(head or panel1?)
  // 0: head, 1: title, 3: do nothing
  
  window.homeFrom = homeFrom;
  
  if(i==-1) i = blogs.length-1;
  i = i%blogs.length;
  let cblog = blogs[i];
  
  
  setTimeout(()=>{
    id('panel'+homeFrom).innerHTML = cblog.getWord(1);
    panel.choose(homeFrom);
  },300)
}

home = () => {
  //mode: 0 (return to home), 1(return to allies)
  let mode = window.homeFrom;
  
  setTimeout(()=>{
  if(mode==0) {
    
    if(blogs.length<1) {
      id('panel0').innerHTML = '<div class="addSB_context"><div class="addSB">add something here</div></div>';
    } else id('panel0').innerHTML = '';
  
  
    for (let i = 0; i < blogs.length; i++) {
      id('panel0').innerHTML += blogs[blogs.length-1-i].getWord(0);
    }
  
  } else
  if(mode==1) {
    
    panel.choose(1)
    title()
  }
  }, 300)
}

title = () => {
  
  let titlew = '<div class="box"><h3>My all blogs</h3>'
  for (let i = 0; i < blogs.length; i++) {
  titlew += blogs[blogs.length-1-i].getTitle();
  }
  titlew += '</div>'
  id('panel1').innerHTML = titlew;
  
  
  for (let i = 0; i < blogs.length; i++) {
  let x;
  let deleteBlog = false;
  id('b'+i).ontouchstart = (ev) => {
    x = ev.touches[0].clientX
    deleteBlog = false;
  }
  
  id('b'+i).ontouchmove = (ev) => {
    
    x2 = ev.touches[0].clientX
    let dx = x2-x;
    
    if(dx>200) {
      id('b' + i).style = 'transition:.5s;background-color: red';
      deleteBlog = true;
    }
  }
  
  id('b'+i).ontouchend = () => {
    if(deleteBlog) {
      
      setTimeout(() => {
      removeBlog(i+1)
      }, 250)
      
    }
  }
  
  
  }
  
  
}

full = (btn, i) => {
  btn.style = 'display: none';
  id('t'+i).innerHTML = blogs[i].getFull();
}

less = (btn, i) => {
  btn.style = 'display: none';
  id('t'+i).innerHTML = blogs[i].word.slice(0,blogs[i].range)+`<button class="read_more" onclick="full(this, `+i+`)">..readmore</button>`;
}

getBlogN = () => {
  return Number(localStorage.getItem('blogNo'))
}

saveBlog = (n, word, head, date) => {
  localStorage.setItem('blogH'+n, head);
  localStorage.setItem('blogW'+n, word);
  localStorage.setItem('blogD'+n, date);
  localStorage.setItem('blogNo', n);
}

removeBlog = (n) => {
  let n_max = getBlogN();
  localStorage.removeItem('blogH'+n);
  localStorage.removeItem('blogW'+n);
  localStorage.removeItem('blogD'+n);
  
  localStorage.setItem('blogNo', n_max-1);
  
  let blogs0 = blogs.slice(0,n-1);
  
  for(let i=n+1;i<n_max+1;i++) {
    
    let head = localStorage.getItem('blogH'+i);
    let word = localStorage.getItem('blogW'+i);
    let date = localStorage.getItem('blogD'+i);
    
    localStorage.setItem('blogH'+(i-1),head);
    localStorage.setItem('blogW'+(i-1),word);
    localStorage.setItem('blogD'+(i-1),date);
    
    blog = blogs[i-1];
    blog.n-=1;
    blogs0.push(blog);
    
  }
  
  localStorage.removeItem('blogH'+n_max);
  localStorage.removeItem('blogW'+n_max);
  localStorage.removeItem('blogD'+n_max);
  
  blogs = blogs0;
  
  title();
  
  
}

addBlog = () => {
  let word = id('wordC').value;
  let head = id('headC').value;
  
  new Blog(word, head);
  title();
  panel.choose(1)
  
  id('wordC').value = '';
  id('headC').value = '';
  
  let n = getBlogN();
  n+=1;
  saveBlog(n, word, head, getDate());
}

editAbout = () => {
  if(editAB) {
    
    id('about').readOnly = true;
    id('updateAbout').innerHTML = 'Edit'
    
    localStorage.setItem('aboutBlog', id('about').value)
    
    editAB = false;
  } else {
    
    id('about').readOnly = false
    id('updateAbout').innerHTML = 'Ok'
    
    editAB = true;
  }
}

changeTheme = () => {
  
  let i = window.themeNo+1;
  ColorPanel.choose(i%cpanels.length)
  localStorage.setItem('themeMode', i%cpanels.length)
}


const menubtn = id('menubtn');
const menu = id('menu');

blogs = []

// class video (controlls>) , class img0


//saving and getting

if(localStorage.getItem('blogNo')==null) {
  localStorage.setItem('blogNo', 0);
} else {
  
  for(let i=1;i<getBlogN()+1;i++) {
    
    let head = localStorage.getItem('blogH'+i)
    let word = localStorage.getItem('blogW'+i)
    let date = localStorage.getItem('blogD'+i)
    let blog = new Blog(word, head)
    blog.date = date;
  }
}

if(localStorage.getItem('aboutBlog')==null) {
  localStorage.setItem('aboutBlog', id('about').value)
} else {
  id('about').value = localStorage.getItem('aboutBlog')
}

if(localStorage.getItem('themeMode')==null) {
  localStorage.setItem('themeMode', window.themeNo);
} else {
  window.themeNo = Number(localStorage.getItem('themeMode'))
  ColorPanel.choose(window.themeNo)
  id('check').checked = window.themeNo
}


    
new PanelBtn(menubtn, [menu], false);

var panel = new Panel('panel', 5);
panel.choose(0);
panel.connect('mhead',5, ()=>{setTimeout(()=>{menubtn.onclick()},300)}, [()=>{window.homeFrom=0;home()}, title])


home(); //write all blogs in panel0
title(); //write all blog titles in panel1

//warning: Remember what is window.homeFrom before the using home function, it is not for just updating, it is for general use like accesing titles in panel1 with button —


/*for(let i=1;i<5;i++) {
  id('wordC').value = 'c'+i
  id('headC').value = 'c'+i
  addBlog()
}*/