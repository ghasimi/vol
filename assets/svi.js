/* 
SVI Shape Visualizer
https://github.com/ghasimi/vol
*/

svi = (k,a,b,rho,m,sig) => {
	w = k.map(k=> a + b * (rho * (k - m)  + ((k - m)**2 + sig**2)**.5))
	return w
}

updateShape = () => {
	const a 	= aInp.value 	/ 10000
	const b 	= bInp.value 	/ 1000
	const rho 	= rhoInp.value 	/ 1000
	const m 	= mInp.value 	/ 1000
	const sig 	= sigInp.value 	/ 1000

	const dte = dteInp.value
	const T = dte / 365

	const n = 50
	const F = 100.
	const Kmin = F * .95
	const Kmax = F * 1.05
	const K = [...Array(n+1).keys().map(x=> Kmin + (Kmax - Kmin) * (x / n) )]
	const k = K.map(K => Math.log(K/F))
	
	const w = svi(k,a,b,rho,m,sig)
	const iv = w.map(w => (w/T)**.5)
	
	const b_base = 0.1
	const sig_base = 0.07
	const w_base = svi(k,0,b_base,0,0,sig_base)
	const iv_base = w_base.map(w => (w/T)**.5)

	const trace_modified = {
		name: `${a}, ${b}, ${rho}, ${m}, ${sig}`,
		x: K,
		y: iv,
		type: 'scatter',
		line: {color: '#0af'}
	}
	const trace_base = {
			name: `0, ${b_base}, 0, 0, ${sig_base}`,
			x: K,
			y: iv_base,
			type: 'scatter',
			line: {color: '#0af', dash: 'dot'}
	}

	const data = [
		trace_modified, 
		trace_base
	];

	const layout = {
		xaxis: {
			showgrid:false, 
			zeroline:false, 
			fixedrange:true
		},
		yaxis: {
			showgrid:false, 
			anchor:'free', 
			position:.5, 
			zeroline:false, 
			fixedrange:true
		},
		margin: {l:0,r:0,t:0,b:50},
		height: 350,
		legend: {
			title:{text:'a, b, ρ, m, σ'},
			x:0.5, 
			y:1, 
			xanchor:'center', 
			yanchor:'top', 
			bgcolor:'rgba(255,255,255,1)'},
	}
	const config = {displayModeBar: false};				
	const fig = {data, layout, config}
	Plotly.newPlot('plotDiv', fig);				
}

let aInp = document.getElementById("aInp")
let bInp = document.getElementById("bInp")
let rhoInp = document.getElementById("rhoInp")
let mInp = document.getElementById("mInp")
let sigInp = document.getElementById("sigInp")
let dteInp = document.getElementById("dteInp")

Array.from([aInp, bInp, rhoInp, mInp, sigInp, dteInp]).map(elm => {
	elm.addEventListener("input", updateShape)				
});

document.addEventListener("DOMContentLoaded", function() {
	updateShape();
});
