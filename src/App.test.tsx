import React from "react";
// import { render, screen } from "@testing-library/react";
import { shallow, mount, render } from "enzyme";
import App from "./App";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.spyOn(React, "useEffect").mockImplementation(f => f());

describe("renders app", () => {
	let store: any;
	const mockStore = configureStore();

	it("should render without throwing an error", () => {
		const initialState = { data: [], isError: false, errorMsg: "" };
		store = mockStore(initialState);

		const wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);

		expect(wrapper.contains(<a href="#">Home</a>)).toBe(true);
		expect(wrapper.contains(<a href="#">RPG</a>)).toBe(true);
		expect(wrapper.contains(<a href="#">Arcade</a>)).toBe(true);
		expect(wrapper.contains(<a href="#">Brain Games</a>)).toBe(true);
		expect(wrapper.contains(<a href="#">Support</a>)).toBe(true);
		expect(wrapper.contains(<a href="#">Contact Us</a>)).toBe(true);
	});

	it("should render layout images and text", () => {
		const initialState = {
			data: [
				{
					src: "landing/pic-1.png",
					mainText:
						"PLAY<br/>WIN<br/>EXCITE<br/><a class='btn btn-red btn-get-started' href='/'>Get Started!</a>",
					spanStyle: {
						display: "inline-block",
						top: "25%",
						left: "28%",
						position: "relative",
						fontSize: "40px"
					}
				},
				{ src: "landing/pic-2.png" },
				{ src: "landing/pic-3.png" },
				{ src: "landing/pic-4.png" },
				{ src: "landing/pic-5.png" },
				{
					src: "landing/pic-6.png",
					mainText: "LIVE GAMES WITH FRIENDS",
					linkHref: "/",
					linkText: "EXPLORE >",
					spanStyle: {
						width: "50%",
						display: "table",
						textAlign: "center",
						margin: "auto",
						top: "30%",
						position: "relative"
					}
				},
				{ src: "landing/pic-7.png" },
				{ src: "landing/pic-8.png" },
				{ src: "landing/pic-9.png" },
				{ src: "landing/pic-10.png" },
				{
					src: "landing/pic-11.png",
					mainText: "LOVE PLAYING?<br/>JOIN THE LEAGUE",
					linkHref: "/",
					linkText: "APPLY NOW >",
					spanStyle: {
						display: "inline-block",
						top: "10%",
						left: "5%",
						position: "relative",
						fontSize: "36px"
					}
				}
			],
			isError: false,
			errorMsg: ""
		};
		store = mockStore(initialState);

		const wrapper = mount(
			<Provider store={store}>
				<App />
			</Provider>
		);

		expect(wrapper.find("div.grid-container").children()).toHaveLength(11);

		initialState.data.forEach((item: any, index: number) => {
			const itemWrapper = wrapper.find(`div.item-${index + 1}`);
			expect(itemWrapper.prop("style")).toHaveProperty(
				"backgroundImage",
				`url(${item.src})`
			);

			if (item.mainText && item.mainText.length > 0) {
				expect(itemWrapper.find(`span`).exists()).toBe(true);
			}

			if (item.linkText && item.linkText.length > 0) {
				expect(itemWrapper.find("a.explore-link").text()).toEqual(
					item.linkText
				);
			}

			if (item.linkHref && item.linkHref.length > 0) {
				expect(
					itemWrapper
						.find("a.explore-link")
						.at(0)
						.props().href
				).toEqual(item.linkHref);
			}
		});
	});
});
