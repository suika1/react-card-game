(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,function(e,t,a){var i={"./4-1.jpg":19,"./4-2.jpg":20,"./4-3.jpg":21,"./4-4.jpg":22,"./4-5.jpg":23,"./4-6.png":24,"./4-7.png":25,"./4-8.jpg":26,"./6-1.jpg":27,"./6-10.jpg":28,"./6-11.jpg":29,"./6-12.jpg":30,"./6-13.jpg":31,"./6-14.jpg":32,"./6-15.jpg":33,"./6-16.jpg":34,"./6-17.jpg":35,"./6-18.jpg":36,"./6-2.jpg":37,"./6-3.jpg":38,"./6-4.jpg":39,"./6-5.jpg":40,"./6-6.jpg":41,"./6-7.jpg":42,"./6-8.jpg":43,"./6-9.jpg":44,"./s1.png":45,"./s2.png":46};function n(e){var t=s(e);return a(t)}function s(e){var t=i[e];if(!(t+1)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return t}n.keys=function(){return Object.keys(i)},n.resolve=s,e.exports=n,n.id=7},,,,function(e,t,a){e.exports=a(12)},function(e,t,a){"use strict";a.r(t);var i=a(10),n=a(2),s=a(3),r=a(6),c=a(4),o=a(5),g=a(1),p=a(0),d=a.n(p),m=a(9),l=a.n(m),h=(a(17),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this,e))).onCoup=a.onCoup.bind(Object(g.a)(Object(g.a)(a))),a}return Object(o.a)(t,e),Object(s.a)(t,[{key:"onCoup",value:function(e){this.props.onCoup(this.props.id,this.props.img)}},{key:"render",value:function(){var e,t,i={};return null!==this.props.img?(e=a(7)("./".concat(this.props.img)),t=a(7)("./".concat(this.props.shirtImg)),this.props.isInverted?i.backgroundImage="url(".concat(e,")"):i.backgroundImage="url(".concat(t),i.backgroundSize="100% 100%"):(i.opacity=0,i.backgroundColor="inherit"),d.a.createElement("div",{className:"card",style:i,onClick:this.onCoup})}}]),t}(d.a.Component)),u=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this,e))).state={invertedImg:null,inactiveCardsIds:[],invertedIds:[],allInactive:!1,isVictory:!0},a.handleCoup=a.handleCoup.bind(Object(g.a)(Object(g.a)(a))),a}return Object(o.a)(t,e),Object(s.a)(t,[{key:"afterGameStarted",value:function(){var e=this;this.props.cards.length!==this.state.invertedIds.length&&(this.props.cards.forEach(function(t,a){e.state.inactiveCardsIds.push(a),e.state.invertedIds.push(a)}),setTimeout(function(){e.props.unforceNewGame(),e.setState({invertedIds:[],inactiveCardsIds:[],isVictory:!1})},5e3))}},{key:"handleCoup",value:function(e,t){var a=this;console.log("recieved click on id = ".concat(e,", img = ").concat(t)),!this.state.invertedIds||this.state.invertedIds.length<1||null===this.state.invertedIds[0]?(console.log("currently no other card is inverted"),this.setState({invertedIds:[e],invertedImg:t})):this.state.invertedIds[0]===e?(console.log("click on same card"),this.setState({invertedIds:[],invertedImg:null})):this.state.invertedImg===t?(console.log("clicked on sibling"),this.state.inactiveCardsIds.push(this.state.invertedIds[0],e),this.setState({invertedIds:[],invertedImg:null}),this.state.inactiveCardsIds.length===this.props.cards.length&&(this.setState({invertedIds:[],invertedImg:null,inactiveCardsIds:[],allInactive:!1,isVictory:!0}),this.props.triggerNewGame())):(console.log("clicked on another card, making all inactive"),this.setState({invertedIds:Object(i.a)(this.state.invertedIds).concat([e]),allInactive:!0}),setTimeout(function(){a.setState({invertedImg:null,invertedIds:[],allInactive:!1}),console.log("All active again")},1e3))}},{key:"render",value:function(){var e=this;(this.state.isVictory||this.props.forcedNewGame)&&this.afterGameStarted();var t=[];return this.props.cards.forEach(function(a,i){var n,s;n=e.state.invertedIds.length===e.props.cards.length?a.image:-1!==e.state.inactiveCardsIds.indexOf(i)&&e.state.invertedIds&&-1===e.state.invertedIds.indexOf(i)?null:a.image,s=e.state.invertedIds.length===e.props.cards.length||null===n||e.state.allInactive?function(){return!1}:e.handleCoup,t.push(d.a.createElement(h,{img:n,shirtImg:e.props.shirtImg,id:i,key:i,isInverted:e.state.invertedIds&&-1!==e.state.invertedIds.indexOf(i),onCoup:s}))}),d.a.createElement("div",{id:"board",style:this.props.style},t)}}]),t}(d.a.Component),j=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(c.a)(t).call(this,e))).state={fieldSize:"4x4",shirtImg:a.props.shirts[0].image,cardsInOrder:f(a.props.cards[0]),forcedNewGame:!1,winCount:0},a.triggerNewGame=a.triggerNewGame.bind(Object(g.a)(Object(g.a)(a))),a.randomizeCards=a.randomizeCards.bind(Object(g.a)(Object(g.a)(a))),a.unforceNewGame=a.unforceNewGame.bind(Object(g.a)(Object(g.a)(a))),a.changeShirt=a.changeShirt.bind(Object(g.a)(Object(g.a)(a))),a.changeSize=a.changeSize.bind(Object(g.a)(Object(g.a)(a))),a.forceNewGame=a.forceNewGame.bind(Object(g.a)(Object(g.a)(a))),a}return Object(o.a)(t,e),Object(s.a)(t,[{key:"triggerNewGame",value:function(){console.log("Game received victory, updating"),this.setState({winCount:this.state.winCount+1}),this.randomizeCards()}},{key:"randomizeCards",value:function(){this.setState({cardsInOrder:f(this.state.cardsInOrder)})}},{key:"unforceNewGame",value:function(){this.setState({forcedNewGame:!1})}},{key:"changeShirt",value:function(e){var t=e.target.classList[1];this.setState({shirtImg:t})}},{key:"changeSize",value:function(e){var t;this.state.forcedNewGame||("4x4"===e.target.id?(t=0,this.setState({fieldSize:"4x4"})):"6x6"===e.target.id?(t=1,this.setState({fieldSize:"6x6"})):"8x8"===e.target.id&&(t=2,this.setState({fieldSize:"8x8"})),this.setState({cardsInOrder:f(this.props.cards[t]),forcedNewGame:!0}))}},{key:"forceNewGame",value:function(){this.state.forcedNewGame||this.setState({forcedNewGame:!0,cardsInOrder:f(this.state.cardsInOrder)})}},{key:"render",value:function(){var e=this,t=[];this.props.shirts.forEach(function(i){var n=a(7)("./".concat(i.image));t.push(d.a.createElement("div",{className:"shirt ".concat(i.image),style:{backgroundImage:"url(".concat(n,")"),backgroundSize:"100% 100%"},onClick:e.changeShirt,key:i.image}))});for(var i={},n="",s="",r=0;r<Math.sqrt(this.state.cardsInOrder.length);r++)n=n.concat("1fr "),s=s.concat("1fr ");return i.gridTemplateColumns=n,i.gridTemplateRows=s,"4x4"===this.state.fieldSize?(i.width="600px",i.height="600px"):"6x6"===this.state.fieldSize&&(i.width="900px",i.height="900px"),d.a.createElement(d.a.Fragment,null,d.a.createElement("h1",{id:"header-shirts"},"\u0420\u0443\u0431\u0430\u0448\u043a\u0430 \u043a\u0430\u0440\u0442\u044b"),d.a.createElement("div",{id:"shirtList"},t),d.a.createElement("div",{id:"field-container"},d.a.createElement(u,{style:i,cards:this.state.cardsInOrder,shirtImg:this.state.shirtImg,triggerNewGame:this.triggerNewGame,forcedNewGame:this.state.forcedNewGame,unforceNewGame:this.unforceNewGame}),d.a.createElement("div",{id:"settings-pane"},d.a.createElement("h1",null,"\u0420\u0430\u0437\u043c\u0435\u0440 \u043f\u043e\u043b\u044f"),d.a.createElement("div",null,d.a.createElement("input",{className:"size-radio",type:"radio",id:"4x4",name:"size",value:"4x4",checked:"4x4"===this.state.fieldSize,onChange:this.changeSize}),d.a.createElement("label",{htmlFor:"huey"},"4x4")),d.a.createElement("div",null,d.a.createElement("input",{className:"size-radio",type:"radio",id:"6x6",name:"size",value:"6x6",checked:"6x6"===this.state.fieldSize,onChange:this.changeSize}),d.a.createElement("label",{htmlFor:"dewey"},"6x6")),d.a.createElement("div",null,d.a.createElement("button",{id:"newGameBtn",onClick:this.forceNewGame},"\u041d\u0430\u0447\u0430\u0442\u044c \u043d\u043e\u0432\u0443\u044e \u0438\u0433\u0440\u0443")),d.a.createElement("h1",{id:"win-counter"},"\u0421\u0447\u0451\u0442\u0447\u0438\u043a \u043f\u043e\u0431\u0435\u0434 : ",this.state.winCount))))}}]),t}(d.a.Component);function f(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),i=[e[a],e[t]];e[t]=i[0],e[a]=i[1]}return e}var v=[[{image:"4-1.jpg"},{image:"4-2.jpg"},{image:"4-3.jpg"},{image:"4-4.jpg"},{image:"4-5.jpg"},{image:"4-6.png"},{image:"4-7.png"},{image:"4-8.jpg"},{image:"4-1.jpg"},{image:"4-2.jpg"},{image:"4-3.jpg"},{image:"4-4.jpg"},{image:"4-5.jpg"},{image:"4-6.png"},{image:"4-7.png"},{image:"4-8.jpg"}],[{image:"6-1.jpg"},{image:"6-2.jpg"},{image:"6-3.jpg"},{image:"6-4.jpg"},{image:"6-5.jpg"},{image:"6-6.jpg"},{image:"6-7.jpg"},{image:"6-8.jpg"},{image:"6-9.jpg"},{image:"6-10.jpg"},{image:"6-11.jpg"},{image:"6-12.jpg"},{image:"6-13.jpg"},{image:"6-14.jpg"},{image:"6-15.jpg"},{image:"6-16.jpg"},{image:"6-17.jpg"},{image:"6-18.jpg"},{image:"6-1.jpg"},{image:"6-2.jpg"},{image:"6-3.jpg"},{image:"6-4.jpg"},{image:"6-5.jpg"},{image:"6-6.jpg"},{image:"6-7.jpg"},{image:"6-8.jpg"},{image:"6-9.jpg"},{image:"6-10.jpg"},{image:"6-11.jpg"},{image:"6-12.jpg"},{image:"6-13.jpg"},{image:"6-14.jpg"},{image:"6-15.jpg"},{image:"6-16.jpg"},{image:"6-17.jpg"},{image:"6-18.jpg"}]];l.a.render(d.a.createElement(j,{cards:v,shirts:[{image:"s1.png"},{image:"s2.png"}]}),document.getElementById("root"))},,,,,function(e,t,a){},,function(e,t,a){e.exports=a.p+"static/media/4-1.29c581ce.jpg"},function(e,t,a){e.exports=a.p+"static/media/4-2.5186fe5e.jpg"},function(e,t,a){e.exports=a.p+"static/media/4-3.2f532660.jpg"},function(e,t,a){e.exports=a.p+"static/media/4-4.b8218b26.jpg"},function(e,t,a){e.exports=a.p+"static/media/4-5.94bbaea6.jpg"},function(e,t,a){e.exports=a.p+"static/media/4-6.d69626da.png"},function(e,t,a){e.exports=a.p+"static/media/4-7.db1c1bde.png"},function(e,t,a){e.exports=a.p+"static/media/4-8.4b752f36.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-1.535944cc.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-10.c92afffc.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-11.44cbcedb.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-12.5ad1023b.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-13.62a3b333.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-14.d4973703.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-15.460c05a3.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-16.a5d4df7f.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-17.43aed17a.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-18.08c9b06f.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-2.9224202d.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-3.bd8b8490.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-4.f2bcf17c.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-5.20eeb5d2.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-6.ce2ef02e.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-7.d48f8c2c.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-8.50f39770.jpg"},function(e,t,a){e.exports=a.p+"static/media/6-9.2c355cfe.jpg"},function(e,t,a){e.exports=a.p+"static/media/s1.9acb110b.png"},function(e,t,a){e.exports=a.p+"static/media/s2.f75440f9.png"}],[[11,2,1]]]);
//# sourceMappingURL=main.94b3f9ef.chunk.js.map