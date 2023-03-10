import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { DataTable } from "react-native-paper";
import {
	MaterialIcons,
	FontAwesome,
	AntDesign,
	Entypo,
} from "@expo/vector-icons";
import { colors, mockdata, fontSizes } from "../constants";

function ImportOnOrders(props) {
	// const orders = mockdata.ordersData;

	const [orders, setOrders] = useState(mockdata.ordersData);
	const [onOrders, setOnOrders] = useState([]);

	return (
		<SafeAreaView style={{ backgroundColor: "white", flex: 100 }}>
			<View style={styles.cellHead}>
				<Text style={styles.textTitleStyle}>Nhập các đơn giao</Text>
			</View>
			<View style={styles.cellMiddle}>
				<View style={styles.cellInfoStyle}>
					<Text style={styles.textInfoStyle}>Tất cả các đơn hàng</Text>
				</View>
				<DataTable style={{ backgroundColor: colors.textinputBackground }}>
					<DataTable.Header>
						<DataTable.Title>Hình ảnh</DataTable.Title>
						<DataTable.Title>Tên sản phẩm</DataTable.Title>
						<DataTable.Title>Địa chỉ</DataTable.Title>
						<DataTable.Title style={{ justifyContent: "center" }}>
							Chọn giao
						</DataTable.Title>
					</DataTable.Header>
					<ScrollView>
						{orders.map((order) => (
							<DataTable.Row>
								<DataTable.Cell>
									<FontAwesome name="product-hunt" size={24} color="black" />
								</DataTable.Cell>
								<DataTable.Cell>{order.productName}</DataTable.Cell>
								<DataTable.Cell>{order.address}</DataTable.Cell>
								<DataTable.Cell style={{ justifyContent: "center" }}>
									<TouchableOpacity
										onPress={() => {
											setOnOrders(onOrders.concat([order]));
											setOrders((orders) =>
												orders.filter((element) => element !== order)
											);
										}}
									>
										<MaterialIcons
											name="delivery-dining"
											size={24}
											color="black"
										/>
									</TouchableOpacity>
								</DataTable.Cell>
							</DataTable.Row>
						))}
					</ScrollView>
				</DataTable>
			</View>
			<View style={styles.cellTail}>
				<View style={styles.cellInfoStyle}>
					<Text style={styles.textInfoStyle}>Các đơn hàng nhập giao</Text>
				</View>
				<DataTable style={{ backgroundColor: colors.textinputBackground }}>
					<DataTable.Header>
						<DataTable.Title>Hình ảnh</DataTable.Title>
						<DataTable.Title>Tên sản phẩm</DataTable.Title>
						<DataTable.Title>Địa chỉ</DataTable.Title>
						<DataTable.Title style={{ justifyContent: "center" }}>
							Đã chọn giao
						</DataTable.Title>
					</DataTable.Header>
					<ScrollView>
						{onOrders.map((order) => (
							<DataTable.Row>
								<DataTable.Cell>
									<FontAwesome name="product-hunt" size={24} color="black" />
								</DataTable.Cell>
								<DataTable.Cell>{order.productName}</DataTable.Cell>
								<DataTable.Cell>{order.address}</DataTable.Cell>
								<DataTable.Cell style={{ justifyContent: "center" }}>
									<TouchableOpacity
										onPress={() => {
											setOrders(orders.concat([order]));
											setOnOrders((onOrders) =>
												onOrders.filter((element) => element !== order)
											);
										}}
									>
										<AntDesign name="checkcircle" size={24} color="black" />
									</TouchableOpacity>
								</DataTable.Cell>
							</DataTable.Row>
						))}
					</ScrollView>
				</DataTable>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	cellHead: {
		flex: 8,
		backgroundColor: "rgb(173, 216, 230)",
		alignItems: "center",
		justifyContent: "center",
	},

	textTitleStyle: { fontSize: fontSizes.h1 },

	textInfoStyle: { fontSize: fontSizes.h5, paddingVertical: 5 },

	cellMiddle: {
		flex: 50,
		backgroundColor: colors.textinputBackground,
		flexDirection: "column",
		alignItems: "center",
	},

	cellInfoStyle: {
		backgroundColor: "white",
		width: "100%",
		alignItems: "center",
	},

	cellContentStyle: {
		flexDirection: "row",
	},

	textInfoStyle: { fontSize: fontSizes.h5, paddingVertical: 5 },

	cellTail: {
		flex: 42,
		backgroundColor: colors.textinputBackground,
		flexDirection: "column",
		alignItems: "center",
	},
});

export default ImportOnOrders;
