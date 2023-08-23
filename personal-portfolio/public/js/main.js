//target要素を指定
const target = document.getElementById('navi');

let elems = document.getElementsByClassName('hover_blueLine');

for (let i = 0; i < elems.length; i++){
	//マウスが要素上に入った時
  elems[i].addEventListener('mouseover', () => {
  elems[i].style.borderBottom = '5px solid blue';
  elems[i].style.transition = '0.5s';
}, false);

//マウスが要素上から離れた時
elems[i].addEventListener('mouseleave', () => {
  elems[i].style.borderBottom = 'none';
}, false);
}