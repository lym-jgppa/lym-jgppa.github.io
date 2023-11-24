import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400&display=swap');
</style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
	display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
	line-height: 1;
}
menu, ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans 3', sans-serif;
  background-color:${props=>props.theme.bgColor};
  color:${props=>props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration: none;
}
`;

interface IThemeToggleButton {
	isDark:boolean;
}

const ThemeToggleButton = styled.span<IThemeToggleButton>`
	display:block;
	position:absolute;
	top: 16px;
	right: 16px;
	cursor: pointer;
	height: 40px;
	width: 40px;
	background-image:url(${ props => props.isDark ? "./light_mode_white_24dp.svg" : "./dark_mode_black_24dp.svg" });
	background-repeat: no-repeat;
	background-position: center center;
	transition: 0.3s;
	opacity: 1;
	border-radius: 50%;
	box-shadow: 1px 1px 6px #ccc;
	&:hover {
		opacity: 0.7;
	}
`;


function App() {
  const setterFn = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setterFn((prev:boolean) => !prev);
  const isDark = useRecoilValue(isDarkAtom);
  return <>
	<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
		<GlobalStyle />
		<ThemeToggleButton onClick={toggleDarkAtom} isDark={isDark}></ThemeToggleButton>
		<Router />
	</ThemeProvider>
  </>;
}

export default App;