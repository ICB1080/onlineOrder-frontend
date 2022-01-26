import React from 'react';

import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";

const { Text } = Typography;

const MyCart = () => {
    const [cartVisible, setCartVisible] = useState(false);
    const [cartData, setCartData] = useState();
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);


    // 每次显示购物车都要去后端获取数据
    // 1. cart is not visible -> return
    // 2. cart is visible
    // 2.1 set loading -> true
    // 2.2 fetch cart data
    // 2.2.1 success -> setCartData(data from the server)
    // 2.2.2 fail -> inform user
    // set loading -> false
    useEffect(() => {
        if (!cartVisible) {
            return;
        }

        setLoading(true);
        getCart()
            .then((data) => {
                setCartData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cartVisible]);

    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("You successfully checkout!");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    return (
        <>
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
            <Drawer
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width={520}
                // 底部button
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text strong={true}>{`Total price: $${cartData ?.totalPrice.toFixed(2)}`}</Text>
                        <div>
                            <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                // cartData为空时和loading时 把checkout设为disabled
                                disabled={loading || cartData?.orderItemList.length === 0}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={cartData? cartData.orderItemList : []}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.menuItem.name}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
};

export default MyCart;