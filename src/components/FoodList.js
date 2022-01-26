import { Button, Card, List, message, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";


const { Option } = Select;


const AddToCartButton = ({ itemId }) => {
    // loading为false
    const [loading, setLoading] = useState(false);

    const addToCart = () => {
        // 1. set loading -> true
        // 2. add item to the server
        // 2.1 case1: success
        //     case2: fail
        //     finally set loading -> false
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`You successfully add item!`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        // 鼠标移入有气泡提示
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                // icon
                icon={<PlusOutlined />}
                onClick={addToCart}
            />
        </Tooltip>
    );
};




const FoodList = () => {
    const [foodData, setFoodData] = useState([]);
    const [curRest, setCurRest] = useState();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRest, setLoadingRest] = useState(false);

    // didMount
    useEffect(() => {
        // step 1 : set loading status -> true
        // step 2: fetch restaurant data from the server
        // step 2.1:
        // case1: success, setRestaurants
        // case2: failed
        // finally -> set loading status -> false
        setLoadingRest(true);
        getRestaurants()
            .then((data) => {
                setRestaurants(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoadingRest(false);
            });
    }, []);


    // didUpdate -> update selected restaurant
    useEffect(() => {
        // step1: set loading status -> true
        // step2: get menu from the server
        // step2.1:
        //      case1: success, setFoodDate
        //      case2: failed
        //      finally: set loading status -> false
        if (curRest) {
            setLoading(true);
            // 把restaurant id传进来才能getMenu
            getMenus(curRest)
                .then((data) => {
                    setFoodData(data);
                })
                .catch((err) => {
                    message.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curRest]);

    return (
        <>
            {/*选餐厅*/}
            <Select
                value={curRest}
                onSelect={(value) => setCurRest(value)}
                placeholder="Select a restaurant"
                loading={loadingRest}
                style={{ width: 300 }}
            >
                {restaurants.map((item) => {
                    return <Option value={item.id}>{item.name}</Option>;
                })}
            </Select>
            {/*选择后有菜单*/}
            {curRest && (
                <List
                    style={{ marginTop: 20 }}
                    loading={loading}
                    // 用来作分隔
                    grid={{
                        gutter: 16,
                        //xs-xxl页面从小到大，数字表示一行显示几个item
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={foodData}
                    renderItem={(item) => (
                        // list里面有很多card，也就是某个餐厅具体的食物列表
                        <List.Item>
                            <Card
                                title={item.name}

                                extra={<AddToCartButton itemId={item.id} />}
                            >
                                <img
                                    src={item.imageUrl}
                                    // 如果图片不存在就用名字
                                    alt={item.name}
                                    style={{ height: 'auto', width: "100%", display: "block" }}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default FoodList;


