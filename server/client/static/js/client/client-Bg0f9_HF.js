import{r as u}from"./client-CFcKg02j.js";import"./client-BX9QSSmL.js";/**
 * react-router v7.1.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var ae="popstate";function Pe(e={}){function t(a,r){let{pathname:o,search:s,hash:c}=a.location;return G("",{pathname:o,search:s,hash:c},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(a,r){return typeof r=="string"?r:M(r)}return Se(t,n,null,e)}function E(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function P(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Le(){return Math.random().toString(36).substring(2,10)}function oe(e,t){return{usr:e.state,key:e.key,idx:t}}function G(e,t,n=null,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?I(t):t,state:n,key:t&&t.key||a||Le()}}function M({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function I(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substring(a),e=e.substring(0,a)),e&&(t.pathname=e)}return t}function Se(e,t,n,a={}){let{window:r=document.defaultView,v5Compat:o=!1}=a,s=r.history,c="POP",l=null,i=f();i==null&&(i=0,s.replaceState({...s.state,idx:i},""));function f(){return(s.state||{idx:null}).idx}function d(){c="POP";let h=f(),p=h==null?null:h-i;i=h,l&&l({action:c,location:v.location,delta:p})}function g(h,p){c="PUSH";let x=G(v.location,h,p);i=f()+1;let y=oe(x,i),R=v.createHref(x);try{s.pushState(y,"",R)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;r.location.assign(R)}o&&l&&l({action:c,location:v.location,delta:1})}function m(h,p){c="REPLACE";let x=G(v.location,h,p);i=f();let y=oe(x,i),R=v.createHref(x);s.replaceState(y,"",R),o&&l&&l({action:c,location:v.location,delta:0})}function w(h){let p=r.location.origin!=="null"?r.location.origin:r.location.href,x=typeof h=="string"?h:M(h);return x=x.replace(/ $/,"%20"),E(p,`No window.location.(origin|href) available to create URL for href: ${x}`),new URL(x,p)}let v={get action(){return c},get location(){return e(r,s)},listen(h){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(ae,d),l=h,()=>{r.removeEventListener(ae,d),l=null}},createHref(h){return t(r,h)},createURL:w,encodeLocation(h){let p=w(h);return{pathname:p.pathname,search:p.search,hash:p.hash}},push:g,replace:m,go(h){return s.go(h)}};return v}function se(e,t,n="/"){return ke(e,t,n,!1)}function ke(e,t,n,a){let r=typeof t=="string"?I(t):t,o=$(r.pathname||"/",n);if(o==null)return null;let s=ce(e);$e(s);let c=null;for(let l=0;c==null&&l<s.length;++l){let i=We(o);c=Oe(s[l],i,a)}return c}function ce(e,t=[],n=[],a=""){let r=(o,s,c)=>{let l={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};l.relativePath.startsWith("/")&&(E(l.relativePath.startsWith(a),`Absolute route path "${l.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),l.relativePath=l.relativePath.slice(a.length));let i=S([a,l.relativePath]),f=n.concat(l);o.children&&o.children.length>0&&(E(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${i}".`),ce(o.children,t,f,i)),!(o.path==null&&!o.index)&&t.push({path:i,score:Me(i,o.index),routesMeta:f})};return e.forEach((o,s)=>{var c;if(o.path===""||!((c=o.path)!=null&&c.includes("?")))r(o,s);else for(let l of fe(o.path))r(o,s,l)}),t}function fe(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,r=n.endsWith("?"),o=n.replace(/\?$/,"");if(a.length===0)return r?[o,""]:[o];let s=fe(a.join("/")),c=[];return c.push(...s.map(l=>l===""?o:[o,l].join("/"))),r&&c.push(...s),c.map(l=>e.startsWith("/")&&l===""?"/":l)}function $e(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Ae(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var Fe=/^:[\w-]+$/,Te=3,Ie=2,De=1,Ne=10,Be=-2,le=e=>e==="*";function Me(e,t){let n=e.split("/"),a=n.length;return n.some(le)&&(a+=Be),t&&(a+=Ie),n.filter(r=>!le(r)).reduce((r,o)=>r+(Fe.test(o)?Te:o===""?De:Ne),a)}function Ae(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function Oe(e,t,n=!1){let{routesMeta:a}=e,r={},o="/",s=[];for(let c=0;c<a.length;++c){let l=a[c],i=c===a.length-1,f=o==="/"?t:t.slice(o.length)||"/",d=K({path:l.relativePath,caseSensitive:l.caseSensitive,end:i},f),g=l.route;if(!d&&i&&n&&!a[a.length-1].route.index&&(d=K({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},f)),!d)return null;Object.assign(r,d.params),s.push({params:r,pathname:S([o,d.pathname]),pathnameBase:ze(S([o,d.pathnameBase])),route:g}),d.pathnameBase!=="/"&&(o=S([o,d.pathnameBase]))}return s}function K(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=Ue(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let o=r[0],s=o.replace(/(.)\/+$/,"$1"),c=r.slice(1);return{params:a.reduce((i,{paramName:f,isOptional:d},g)=>{if(f==="*"){let w=c[g]||"";s=o.slice(0,o.length-w.length).replace(/(.)\/+$/,"$1")}const m=c[g];return d&&!m?i[f]=void 0:i[f]=(m||"").replace(/%2F/g,"/"),i},{}),pathname:o,pathnameBase:s,pattern:e}}function Ue(e,t=!1,n=!0){P(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,c,l)=>(a.push({paramName:c,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(a.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function We(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return P(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function $(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}function He(e,t="/"){let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?I(e):e;return{pathname:n?n.startsWith("/")?n:_e(n,t):t,search:Ke(a),hash:Je(r)}}function _e(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function j(e,t,n,a){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Ve(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function de(e){let t=Ve(e);return t.map((n,a)=>a===t.length-1?n.pathname:n.pathnameBase)}function he(e,t,n,a=!1){let r;typeof e=="string"?r=I(e):(r={...e},E(!r.pathname||!r.pathname.includes("?"),j("?","pathname","search",r)),E(!r.pathname||!r.pathname.includes("#"),j("#","pathname","hash",r)),E(!r.search||!r.search.includes("#"),j("#","search","hash",r)));let o=e===""||r.pathname==="",s=o?"/":r.pathname,c;if(s==null)c=n;else{let d=t.length-1;if(!a&&s.startsWith("..")){let g=s.split("/");for(;g[0]==="..";)g.shift(),d-=1;r.pathname=g.join("/")}c=d>=0?t[d]:"/"}let l=He(r,c),i=s&&s!=="/"&&s.endsWith("/"),f=(o||s===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(i||f)&&(l.pathname+="/"),l}var S=e=>e.join("/").replace(/\/\/+/g,"/"),ze=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ke=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Je=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ye(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var me=["POST","PUT","PATCH","DELETE"];new Set(me);var je=["GET",...me];new Set(je);var D=u.createContext(null);D.displayName="DataRouter";var J=u.createContext(null);J.displayName="DataRouterState";var pe=u.createContext({isTransitioning:!1});pe.displayName="ViewTransition";var qe=u.createContext(new Map);qe.displayName="Fetchers";var Ge=u.createContext(null);Ge.displayName="Await";var L=u.createContext(null);L.displayName="Navigation";var A=u.createContext(null);A.displayName="Location";var k=u.createContext({outlet:null,matches:[],isDataRoute:!1});k.displayName="Route";var Q=u.createContext(null);Q.displayName="RouteError";function Xe(e,{relative:t}={}){E(O(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=u.useContext(L),{hash:r,pathname:o,search:s}=U(e,{relative:t}),c=o;return n!=="/"&&(c=o==="/"?n:S([n,o])),a.createHref({pathname:c,search:s,hash:r})}function O(){return u.useContext(A)!=null}function F(){return E(O(),"useLocation() may be used only in the context of a <Router> component."),u.useContext(A).location}var ye="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function ge(e){u.useContext(L).static||u.useLayoutEffect(e)}function Qe(){let{isDataRoute:e}=u.useContext(k);return e?ft():Ze()}function Ze(){E(O(),"useNavigate() may be used only in the context of a <Router> component.");let e=u.useContext(D),{basename:t,navigator:n}=u.useContext(L),{matches:a}=u.useContext(k),{pathname:r}=F(),o=JSON.stringify(de(a)),s=u.useRef(!1);return ge(()=>{s.current=!0}),u.useCallback((l,i={})=>{if(P(s.current,ye),!s.current)return;if(typeof l=="number"){n.go(l);return}let f=he(l,JSON.parse(o),r,i.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:S([t,f.pathname])),(i.replace?n.replace:n.push)(f,i.state,i)},[t,n,o,r,e])}u.createContext(null);function U(e,{relative:t}={}){let{matches:n}=u.useContext(k),{pathname:a}=F(),r=JSON.stringify(de(n));return u.useMemo(()=>he(e,JSON.parse(r),a,t==="path"),[e,r,a,t])}function et(e,t){return ve(e,t)}function ve(e,t,n,a){var x;E(O(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r,static:o}=u.useContext(L),{matches:s}=u.useContext(k),c=s[s.length-1],l=c?c.params:{},i=c?c.pathname:"/",f=c?c.pathnameBase:"/",d=c&&c.route;{let y=d&&d.path||"";we(i,!d||y.endsWith("*")||y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${i}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y==="/"?"*":`${y}/*`}">.`)}let g=F(),m;if(t){let y=typeof t=="string"?I(t):t;E(f==="/"||((x=y.pathname)==null?void 0:x.startsWith(f)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${y.pathname}" was given in the \`location\` prop.`),m=y}else m=g;let w=m.pathname||"/",v=w;if(f!=="/"){let y=f.replace(/^\//,"").split("/");v="/"+w.replace(/^\//,"").split("/").slice(y.length).join("/")}let h=!o&&n&&n.matches&&n.matches.length>0?n.matches:se(e,{pathname:v});P(d||h!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),P(h==null||h[h.length-1].route.element!==void 0||h[h.length-1].route.Component!==void 0||h[h.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let p=ot(h&&h.map(y=>Object.assign({},y,{params:Object.assign({},l,y.params),pathname:S([f,r.encodeLocation?r.encodeLocation(y.pathname).pathname:y.pathname]),pathnameBase:y.pathnameBase==="/"?f:S([f,r.encodeLocation?r.encodeLocation(y.pathnameBase).pathname:y.pathnameBase])})),s,n,a);return t&&p?u.createElement(A.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...m},navigationType:"POP"}},p):p}function tt(){let e=ct(),t=Ye(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:a},o={padding:"2px 4px",backgroundColor:a},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=u.createElement(u.Fragment,null,u.createElement("p",null,"💿 Hey developer 👋"),u.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",u.createElement("code",{style:o},"ErrorBoundary")," or"," ",u.createElement("code",{style:o},"errorElement")," prop on your route.")),u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),n?u.createElement("pre",{style:r},n):null,s)}var nt=u.createElement(tt,null),rt=class extends u.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error("React Router caught the following error during render",e,t)}render(){return this.state.error!==void 0?u.createElement(k.Provider,{value:this.props.routeContext},u.createElement(Q.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function at({routeContext:e,match:t,children:n}){let a=u.useContext(D);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),u.createElement(k.Provider,{value:e},n)}function ot(e,t=[],n=null,a=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let r=e,o=n==null?void 0:n.errors;if(o!=null){let l=r.findIndex(i=>i.route.id&&(o==null?void 0:o[i.route.id])!==void 0);E(l>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),r=r.slice(0,Math.min(r.length,l+1))}let s=!1,c=-1;if(n)for(let l=0;l<r.length;l++){let i=r[l];if((i.route.HydrateFallback||i.route.hydrateFallbackElement)&&(c=l),i.route.id){let{loaderData:f,errors:d}=n,g=i.route.loader&&!f.hasOwnProperty(i.route.id)&&(!d||d[i.route.id]===void 0);if(i.route.lazy||g){s=!0,c>=0?r=r.slice(0,c+1):r=[r[0]];break}}}return r.reduceRight((l,i,f)=>{let d,g=!1,m=null,w=null;n&&(d=o&&i.route.id?o[i.route.id]:void 0,m=i.route.errorElement||nt,s&&(c<0&&f===0?(we("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,w=null):c===f&&(g=!0,w=i.route.hydrateFallbackElement||null)));let v=t.concat(r.slice(0,f+1)),h=()=>{let p;return d?p=m:g?p=w:i.route.Component?p=u.createElement(i.route.Component,null):i.route.element?p=i.route.element:p=l,u.createElement(at,{match:i,routeContext:{outlet:l,matches:v,isDataRoute:n!=null},children:p})};return n&&(i.route.ErrorBoundary||i.route.errorElement||f===0)?u.createElement(rt,{location:n.location,revalidation:n.revalidation,component:m,error:d,children:h(),routeContext:{outlet:null,matches:v,isDataRoute:!0}}):h()},null)}function Z(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function lt(e){let t=u.useContext(D);return E(t,Z(e)),t}function it(e){let t=u.useContext(J);return E(t,Z(e)),t}function ut(e){let t=u.useContext(k);return E(t,Z(e)),t}function ee(e){let t=ut(e),n=t.matches[t.matches.length-1];return E(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function st(){return ee("useRouteId")}function ct(){var a;let e=u.useContext(Q),t=it("useRouteError"),n=ee("useRouteError");return e!==void 0?e:(a=t.errors)==null?void 0:a[n]}function ft(){let{router:e}=lt("useNavigate"),t=ee("useNavigate"),n=u.useRef(!1);return ge(()=>{n.current=!0}),u.useCallback(async(r,o={})=>{P(n.current,ye),n.current&&(typeof r=="number"?e.navigate(r):await e.navigate(r,{fromRouteId:t,...o}))},[e,t])}var ie={};function we(e,t,n){!t&&!ie[e]&&(ie[e]=!0,P(!1,n))}u.memo(dt);function dt({routes:e,future:t,state:n}){return ve(e,void 0,n,t)}function ht(e){E(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function mt({basename:e="/",children:t=null,location:n,navigationType:a="POP",navigator:r,static:o=!1}){E(!O(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),c=u.useMemo(()=>({basename:s,navigator:r,static:o,future:{}}),[s,r,o]);typeof n=="string"&&(n=I(n));let{pathname:l="/",search:i="",hash:f="",state:d=null,key:g="default"}=n,m=u.useMemo(()=>{let w=$(l,s);return w==null?null:{location:{pathname:w,search:i,hash:f,state:d,key:g},navigationType:a}},[s,l,i,f,d,g,a]);return P(m!=null,`<Router basename="${s}"> is not able to match the URL "${l}${i}${f}" because it does not start with the basename, so the <Router> won't render anything.`),m==null?null:u.createElement(L.Provider,{value:c},u.createElement(A.Provider,{children:t,value:m}))}function qt({children:e,location:t}){return et(X(e),t)}function X(e,t=[]){let n=[];return u.Children.forEach(e,(a,r)=>{if(!u.isValidElement(a))return;let o=[...t,r];if(a.type===u.Fragment){n.push.apply(n,X(a.props.children,o));return}E(a.type===ht,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),E(!a.props.index||!a.props.children,"An index route cannot have child routes.");let s={id:a.props.id||o.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(s.children=X(a.props.children,o)),n.push(s)}),n}var V="get",z="application/x-www-form-urlencoded";function Y(e){return e!=null&&typeof e.tagName=="string"}function pt(e){return Y(e)&&e.tagName.toLowerCase()==="button"}function yt(e){return Y(e)&&e.tagName.toLowerCase()==="form"}function gt(e){return Y(e)&&e.tagName.toLowerCase()==="input"}function vt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function wt(e,t){return e.button===0&&(!t||t==="_self")&&!vt(e)}var _=null;function xt(){if(_===null)try{new FormData(document.createElement("form"),0),_=!1}catch{_=!0}return _}var Et=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function q(e){return e!=null&&!Et.has(e)?(P(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${z}"`),null):e}function Rt(e,t){let n,a,r,o,s;if(yt(e)){let c=e.getAttribute("action");a=c?$(c,t):null,n=e.getAttribute("method")||V,r=q(e.getAttribute("enctype"))||z,o=new FormData(e)}else if(pt(e)||gt(e)&&(e.type==="submit"||e.type==="image")){let c=e.form;if(c==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||c.getAttribute("action");if(a=l?$(l,t):null,n=e.getAttribute("formmethod")||c.getAttribute("method")||V,r=q(e.getAttribute("formenctype"))||q(c.getAttribute("enctype"))||z,o=new FormData(c,e),!xt()){let{name:i,type:f,value:d}=e;if(f==="image"){let g=i?`${i}.`:"";o.append(`${g}x`,"0"),o.append(`${g}y`,"0")}else i&&o.append(i,d)}}else{if(Y(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=V,a=null,r=z,s=e}return o&&r==="text/plain"&&(s=o,o=void 0),{action:a,method:n.toLowerCase(),encType:r,formData:o,body:s}}function te(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}async function Ct(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function bt(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Pt(e,t,n){let a=await Promise.all(e.map(async r=>{let o=t.routes[r.route.id];if(o){let s=await Ct(o,n);return s.links?s.links():[]}return[]}));return $t(a.flat(1).filter(bt).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function ue(e,t,n,a,r,o){let s=(l,i)=>n[i]?l.route.id!==n[i].route.id:!0,c=(l,i)=>{var f;return n[i].pathname!==l.pathname||((f=n[i].route.path)==null?void 0:f.endsWith("*"))&&n[i].params["*"]!==l.params["*"]};return o==="assets"?t.filter((l,i)=>s(l,i)||c(l,i)):o==="data"?t.filter((l,i)=>{var d;let f=a.routes[l.route.id];if(!f||!f.hasLoader)return!1;if(s(l,i)||c(l,i))return!0;if(l.route.shouldRevalidate){let g=l.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof g=="boolean")return g}return!0}):[]}function Lt(e,t){return St(e.map(n=>{let a=t.routes[n.route.id];if(!a)return[];let r=[a.module];return a.imports&&(r=r.concat(a.imports)),r}).flat(1))}function St(e){return[...new Set(e)]}function kt(e){let t={},n=Object.keys(e).sort();for(let a of n)t[a]=e[a];return t}function $t(e,t){let n=new Set;return new Set(t),e.reduce((a,r)=>{let o=JSON.stringify(kt(r));return n.has(o)||(n.add(o),a.push({key:o,link:r})),a},[])}function Ft(e){let t=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return t.pathname==="/"?t.pathname="_root.data":t.pathname=`${t.pathname.replace(/\/$/,"")}.data`,t}function Tt(){let e=u.useContext(D);return te(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function It(){let e=u.useContext(J);return te(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var ne=u.createContext(void 0);ne.displayName="FrameworkContext";function xe(){let e=u.useContext(ne);return te(e,"You must render this element inside a <HydratedRouter> element"),e}function Dt(e,t){let n=u.useContext(ne),[a,r]=u.useState(!1),[o,s]=u.useState(!1),{onFocus:c,onBlur:l,onMouseEnter:i,onMouseLeave:f,onTouchStart:d}=t,g=u.useRef(null);u.useEffect(()=>{if(e==="render"&&s(!0),e==="viewport"){let v=p=>{p.forEach(x=>{s(x.isIntersecting)})},h=new IntersectionObserver(v,{threshold:.5});return g.current&&h.observe(g.current),()=>{h.disconnect()}}},[e]),u.useEffect(()=>{if(a){let v=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(v)}}},[a]);let m=()=>{r(!0)},w=()=>{r(!1),s(!1)};return n?e!=="intent"?[o,g,{}]:[o,g,{onFocus:B(c,m),onBlur:B(l,w),onMouseEnter:B(i,m),onMouseLeave:B(f,w),onTouchStart:B(d,m)}]:[!1,g,{}]}function B(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Nt({page:e,...t}){let{router:n}=Tt(),a=u.useMemo(()=>se(n.routes,e,n.basename),[n.routes,e,n.basename]);return a?u.createElement(Mt,{page:e,matches:a,...t}):null}function Bt(e){let{manifest:t,routeModules:n}=xe(),[a,r]=u.useState([]);return u.useEffect(()=>{let o=!1;return Pt(e,t,n).then(s=>{o||r(s)}),()=>{o=!0}},[e,t,n]),a}function Mt({page:e,matches:t,...n}){let a=F(),{manifest:r,routeModules:o}=xe(),{loaderData:s,matches:c}=It(),l=u.useMemo(()=>ue(e,t,c,r,a,"data"),[e,t,c,r,a]),i=u.useMemo(()=>ue(e,t,c,r,a,"assets"),[e,t,c,r,a]),f=u.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let m=new Set,w=!1;if(t.forEach(h=>{var x;let p=r.routes[h.route.id];!p||!p.hasLoader||(!l.some(y=>y.route.id===h.route.id)&&h.route.id in s&&((x=o[h.route.id])!=null&&x.shouldRevalidate)||p.hasClientLoader?w=!0:m.add(h.route.id))}),m.size===0)return[];let v=Ft(e);return w&&m.size>0&&v.searchParams.set("_routes",t.filter(h=>m.has(h.route.id)).map(h=>h.route.id).join(",")),[v.pathname+v.search]},[s,a,r,l,t,e,o]),d=u.useMemo(()=>Lt(i,r),[i,r]),g=Bt(i);return u.createElement(u.Fragment,null,f.map(m=>u.createElement("link",{key:m,rel:"prefetch",as:"fetch",href:m,...n})),d.map(m=>u.createElement("link",{key:m,rel:"modulepreload",href:m,...n})),g.map(({key:m,link:w})=>u.createElement("link",{key:m,...w})))}function At(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var Ee=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Ee&&(window.__reactRouterVersion="7.1.5")}catch{}function Gt({basename:e,children:t,window:n}){let a=u.useRef();a.current==null&&(a.current=Pe({window:n,v5Compat:!0}));let r=a.current,[o,s]=u.useState({action:r.action,location:r.location}),c=u.useCallback(l=>{u.startTransition(()=>s(l))},[s]);return u.useLayoutEffect(()=>r.listen(c),[r,c]),u.createElement(mt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:r})}var Re=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ce=u.forwardRef(function({onClick:t,discover:n="render",prefetch:a="none",relative:r,reloadDocument:o,replace:s,state:c,target:l,to:i,preventScrollReset:f,viewTransition:d,...g},m){let{basename:w}=u.useContext(L),v=typeof i=="string"&&Re.test(i),h,p=!1;if(typeof i=="string"&&v&&(h=i,Ee))try{let b=new URL(window.location.href),T=i.startsWith("//")?new URL(b.protocol+i):new URL(i),re=$(T.pathname,w);T.origin===b.origin&&re!=null?i=re+T.search+T.hash:p=!0}catch{P(!1,`<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let x=Xe(i,{relative:r}),[y,R,C]=Dt(a,g),W=Ht(i,{replace:s,state:c,target:l,preventScrollReset:f,relative:r,viewTransition:d});function N(b){t&&t(b),b.defaultPrevented||W(b)}let H=u.createElement("a",{...g,...C,href:h||x,onClick:p||o?t:N,ref:At(m,R),target:l,"data-discover":!v&&n==="render"?"true":void 0});return y&&!v?u.createElement(u.Fragment,null,H,u.createElement(Nt,{page:x})):H});Ce.displayName="Link";var Ot=u.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:a="",end:r=!1,style:o,to:s,viewTransition:c,children:l,...i},f){let d=U(s,{relative:i.relative}),g=F(),m=u.useContext(J),{navigator:w,basename:v}=u.useContext(L),h=m!=null&&Jt(d)&&c===!0,p=w.encodeLocation?w.encodeLocation(d).pathname:d.pathname,x=g.pathname,y=m&&m.navigation&&m.navigation.location?m.navigation.location.pathname:null;n||(x=x.toLowerCase(),y=y?y.toLowerCase():null,p=p.toLowerCase()),y&&v&&(y=$(y,v)||y);const R=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let C=x===p||!r&&x.startsWith(p)&&x.charAt(R)==="/",W=y!=null&&(y===p||!r&&y.startsWith(p)&&y.charAt(p.length)==="/"),N={isActive:C,isPending:W,isTransitioning:h},H=C?t:void 0,b;typeof a=="function"?b=a(N):b=[a,C?"active":null,W?"pending":null,h?"transitioning":null].filter(Boolean).join(" ");let T=typeof o=="function"?o(N):o;return u.createElement(Ce,{...i,"aria-current":H,className:b,ref:f,style:T,to:s,viewTransition:c},typeof l=="function"?l(N):l)});Ot.displayName="NavLink";var Ut=u.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:a,replace:r,state:o,method:s=V,action:c,onSubmit:l,relative:i,preventScrollReset:f,viewTransition:d,...g},m)=>{let w=zt(),v=Kt(c,{relative:i}),h=s.toLowerCase()==="get"?"get":"post",p=typeof c=="string"&&Re.test(c),x=y=>{if(l&&l(y),y.defaultPrevented)return;y.preventDefault();let R=y.nativeEvent.submitter,C=(R==null?void 0:R.getAttribute("formmethod"))||s;w(R||y.currentTarget,{fetcherKey:t,method:C,navigate:n,replace:r,state:o,relative:i,preventScrollReset:f,viewTransition:d})};return u.createElement("form",{ref:m,method:h,action:v,onSubmit:a?l:x,...g,"data-discover":!p&&e==="render"?"true":void 0})});Ut.displayName="Form";function Wt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function be(e){let t=u.useContext(D);return E(t,Wt(e)),t}function Ht(e,{target:t,replace:n,state:a,preventScrollReset:r,relative:o,viewTransition:s}={}){let c=Qe(),l=F(),i=U(e,{relative:o});return u.useCallback(f=>{if(wt(f,t)){f.preventDefault();let d=n!==void 0?n:M(l)===M(i);c(e,{replace:d,state:a,preventScrollReset:r,relative:o,viewTransition:s})}},[l,c,i,n,a,t,e,r,o,s])}var _t=0,Vt=()=>`__${String(++_t)}__`;function zt(){let{router:e}=be("useSubmit"),{basename:t}=u.useContext(L),n=st();return u.useCallback(async(a,r={})=>{let{action:o,method:s,encType:c,formData:l,body:i}=Rt(a,t);if(r.navigate===!1){let f=r.fetcherKey||Vt();await e.fetch(f,n,r.action||o,{preventScrollReset:r.preventScrollReset,formData:l,body:i,formMethod:r.method||s,formEncType:r.encType||c,flushSync:r.flushSync})}else await e.navigate(r.action||o,{preventScrollReset:r.preventScrollReset,formData:l,body:i,formMethod:r.method||s,formEncType:r.encType||c,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[e,t,n])}function Kt(e,{relative:t}={}){let{basename:n}=u.useContext(L),a=u.useContext(k);E(a,"useFormAction must be used inside a RouteContext");let[r]=a.matches.slice(-1),o={...U(e||".",{relative:t})},s=F();if(e==null){o.search=s.search;let c=new URLSearchParams(o.search),l=c.getAll("index");if(l.some(f=>f==="")){c.delete("index"),l.filter(d=>d).forEach(d=>c.append("index",d));let f=c.toString();o.search=f?`?${f}`:""}}return(!e||e===".")&&r.route.index&&(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(o.pathname=o.pathname==="/"?n:S([n,o.pathname])),M(o)}function Jt(e,t={}){let n=u.useContext(pe);E(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=be("useViewTransitionState"),r=U(e,{relative:t.relative});if(!n.isTransitioning)return!1;let o=$(n.currentLocation.pathname,a)||n.currentLocation.pathname,s=$(n.nextLocation.pathname,a)||n.nextLocation.pathname;return K(r.pathname,s)!=null||K(r.pathname,o)!=null}new TextEncoder;export{Gt as B,Ce as L,qt as R,ht as a};
