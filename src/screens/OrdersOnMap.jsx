import React, { useState, useEffect, Component } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Text,
	Image,
	Alert,
	TouchableOpacity,
	Platform,
	PermissionsAndroid,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, {
	Marker,
	AnimatedRegion,
	Polyline,
	PROVIDER_GOOGLE,
	Callout,
} from "react-native-maps";
import * as Location from "expo-location";
import haversine from "haversine";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontSizes, icons, mockdata } from "../constants";

function MapOrders(props) {
	// Store permissions
	const [foregroundPermissions, setForegroundPermissions] = useState(null);
	const [backgroundPermissions, setBackgroundPermissions] = useState(null);

	// Show textinput to enter note
	const [showInputText, setShowInputText] = useState(false);

	// Store new notification
	const [note, setNote] = useState("");

	// Store current location
	const [currentLocation, setCurrentLocation] = useState(null);

	// Store key to get order to save note
	const [keyOfOrder, setKeyOfOrder] = useState("");

	// Mock data || array of orders
	const onOrders = mockdata.onOrdersData;

	const [followingButton, setFollwingButton] = useState({
		following: true,
		name: "gps-fixed",
	});

	// Fetch/GET data from api
	useEffect(() => {
		// onOrders.map((onOrder) => {
		// 	onOrder.notification = "...";
		// });
		// setShowInputText(false);
	}, []);

	{
		/*
		*** Sự kiện diễn ra khi nhấn vào marker
			+ Ẩn đi bàn phím
			+ Hiển thị chú thích

		*** Sự kiện diễn ra khi nhấn vào chú thích
			+ Cho bàn phím nổi lên
			+ Hiển thị ô text để nhập chú thích của bạn

		********************************
		QUY TRÌNH NGHIỆP VỤ KINH DOANH CÓ THỂ:
			- Bản đồ hiển thị vị trí đánh dấu các đơn hàng.
			- Nhấn vào điểm đánh dấu (đơn hàng) để hiển thị ra chú thích của đơn hàng đó.
			- Nhấn vào chú thích, sẽ hiển thị 3 buttom: 	
				+ Button 1: Nhấp để vào trạng thái ghi chú thích.
				+ Button 2: Nhấp để thoát trạng thái ghi chú thích.
				+ Button 3: Nhấp để đi đến màn hình chỉnh sửa chi tiết đơn hàng.
		*/
	}

	return (
		<SafeAreaView style={styles.container}>
			<MapView
				style={styles.map}
				showsUserLocation={true}
				followsUserLocation={followingButton.following}
				loadingEnabled={true}
				// region={getMapRegion()}
				initialRegion={{
					latitude: 21.0376565464535,
					longitude: 105.78337862624798,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<View
					style={{
						marginTop: 40,
						flexDirection: "column",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						backgroundColor: "transparent",
					}}
				>
					<TouchableOpacity
						onPress={() => {
							if (followingButton.following === true) {
								setFollwingButton({
									following: false,
									name: "gps-not-fixed",
								});
							} else {
								setFollwingButton({
									following: true,
									name: "gps-fixed",
								});
							}
						}}
						style={{
							width: 45,
							height: 45,
							backgroundColor: "transparent", // red transparent
							alignItems: "center",
							justifyContent: "center",
							marginRight: 2,
							marginBottom: 5,
						}}
					>
						<MaterialIcons
							name={followingButton.name}
							size={34}
							color={colors.primary}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setNote("");
							setShowInputText(false);
						}}
						style={{
							width: 45,
							height: 45,
							backgroundColor: "transparent", // red transparent
							alignItems: "center",
							justifyContent: "center",
							marginRight: 2,
						}}
					>
						<MaterialIcons name="cancel" size={34} color={colors.primary} />
					</TouchableOpacity>
				</View>
				{onOrders.map((onOrder) => (
					<Marker
						// step 1
						onPress={() => {
							setNote("");
							setShowInputText(false);
						}}
						// step 2
						onCalloutPress={() => {
							setKeyOfOrder(onOrder._id);
							setShowInputText(true);
							setNote(onOrder.note);
						}}
						key={onOrder._id}
						coordinate={onOrder.coordinates}
						title={
							onOrder.note === ""
								? "Chú thích riêng..., " + onOrder.address
								: onOrder.note + ", " + onOrder.address
						}
					></Marker>
				))}
			</MapView>
			{showInputText && (
				<View style={styles.buttonContainer}>
					<TextInput
						onChangeText={(text) => setNote(text)}
						defaultValue={note}
						autoFocus={showInputText}
						style={{
							borderColor: colors.primary,
							borderWidth: 1,
							color: "black",
							fontSize: 20,
							marginLeft: 20,
							paddingLeft: 6,
							width: "60%",
						}}
						placeholder=" Nhập chú thích"
						placeholderTextColor={colors.placeholderColor}
					></TextInput>
					<TouchableOpacity // Button used to confirm save notes
						onPress={() => {
							onOrders.map((onOrder) => {
								if (onOrder._id === keyOfOrder) {
									onOrder.note = note;
								}
							});
							console.log(note);
							setNote("");
							setShowInputText(false);
						}}
						style={{
							backgroundColor: "transparent",
							width: 32,
							height: 32,
							margin: 2,
							marginLeft: 10,
						}}
					>
						<MaterialIcons
							name="check-circle"
							size={35}
							color={colors.primary}
						/>
					</TouchableOpacity>
					<TouchableOpacity // Button used to edit order details
						onPress={() => {}}
						style={{
							backgroundColor: "transparent",
							width: 32,
							height: 32,
							margin: 2,
							marginLeft: 10,
						}}
					>
						<MaterialCommunityIcons
							name="note-edit"
							size={36}
							color={colors.primary}
						/>
					</TouchableOpacity>
					<TouchableOpacity // Button used to confirm the order has been received
						onPress={() => {
							setNote("");
							setShowInputText(false);
							Alert.alert("Đã xác nhận giao hàng thành công");
						}}
						style={{
							backgroundColor: "transparent",
							width: 32,
							height: 32,
							margin: 2,
							marginLeft: 10,
						}}
					>
						<MaterialCommunityIcons
							name="truck-delivery"
							size={36}
							color={colors.primary}
						/>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	bubble: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,0.7)",
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20,
	},
	latlng: {
		width: 200,
		alignItems: "stretch",
	},
	button: {
		width: 80,
		paddingHorizontal: 12,
		alignItems: "center",
		marginHorizontal: 10,
	},
	buttonContainer: {
		flexDirection: "row",
		marginVertical: 20,
		backgroundColor: colors.textinputBackground,
		borderColor: colors.primary,
		paddingVertical: 6,
		// borderWidth: 1,
		width: "100%",
		marginBottom: "90%",
		// backgroundColor: "red",
	},
});

export default MapOrders;
