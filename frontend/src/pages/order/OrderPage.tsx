import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { TopBar } from "../../components/layout/TopBar";
import { getAllMenuItems } from "../../api/menuItemApi";
import { useAuth } from "../../context/AuthContext";
import { getOrdersByTab } from "../../api/orderApi";
import axios from "axios";
import { CalendarSync, Filter, Key } from "lucide-react";

const api = axios.create({ baseURL: "/api", withCredentials: true });

interface MenuItem {
  id: number;
  name: string;
  price: number;
  section: string;
}

interface OrderItem {
  id: number;
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Tab {
  id: number;
  tableNumber: string;
  tableStatus: string;
  createdAt: string;
}

export function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tab, orderId: initialOrderId } = location.state as {
    tab: Tab;
    orderId: number | null;
  };

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderId, setOrderId] = useState<number | null>(initialOrderId);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pendingItems, setPendingItems] = useState<
    { menuItem: menuItems; quantity: number }[]
  >([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // load the menu items
  useEffect(() => {
    getAllMenuItems().then((res) => setMenuItems(res.data));
  }, []);

  // load existing order items if editing
  useEffect(() => {
    if (!initialOrderId) return;
    getOrdersByTab(tab.id).then((res) => {
      const open = res.data.find((o: any) => o.status === "OPEN");
      if (open) {
        setOrderItems(open.orderItems);
        setTotalAmount(open.totalAmount);
      }
    });
  }, [initialOrderId]);

  const addItem = async (menuItem: MenuItem) => {
    //new order (just add to local pending list)
    if (!orderId) {
      setPendingItems((prev) => {
        const existing = prev.find((i) => i.menuItem.id === menuItem.id);

        if (existing) {
          return prev.map((i) =>
            i.menuItem.id === menuItem.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }
        return [...prev, { menuItem, quantity: 1 }];
      });
      return;
    }
    // edit order (send everything to the backend)
    const existing = orderItems.find((i) => i.menuItemId === menuItem.id);
    if (existing) {
      await api.put(`/orders/${orderId}/items/${existing.id}`, {
        menuItemId: menuItem.id,
        quantity: existing.quantity + 1,
      });
    } else {
      await api.post(`/orders/${orderId}/items`, {
        menuItemId: menuItem.id,
        quantity: 1,
      });
    }
    refreshOrder(orderId);
  };

  const removeItem = async (orderItemId: number) => {
    if (!orderId) return;
    await api.delete(`/orders/${orderId}/items/${orderItemId}`);
    refreshOrder(orderId);
  };

  const changeQuantity = async (orderItem: OrderItem, delta: number) => {
    if (!orderId) return;

    const newQuantity = orderItem.quantity + delta;
    if (newQuantity <= 0) {
      await removeItem(orderItem.id);
      return;
    }
    await api.put(`/orders/${orderId}/items/${orderItem.id}`, {
      menuItemId: orderItem.menuItemId,
      quantity: newQuantity,
    });
    refreshOrder(orderId);
  };

  const refreshOrder = (id: number) => {
    api.get(`/orders/${id}`).then((res) => {
      setOrderItems(res.data.orderItems);
      setTotalAmount(res.data.totalAmount);
    });
  };

  const sections = [
    "ALL",
    ...Array.from(new Set(menuItems.map((m) => m.section))),
  ];

  const filteredItems = menuItems.filter((m) => {
    const matchesFilter = filter === "ALL" || m.section === filter;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Edit current order - Table #{tab.tableNumber}
              </h2>
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-gray-500 hover:text-gray-800 underline"
              >
                Back to Dashboard
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
            />

            {/* Filter the tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {sections.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 py-.15 rounded-full text-xs font-medium border transition-colors ${
                    filter === s
                      ? "bg-[#0C2B4E] text-white border-[#0C2B4E]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {/* menu item */}
            <div className="grid grid-cols-4 gap-3 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-center gap-2 hover:border-[#0C2B4E] hover:shadow-sm transition-all text-center"
                >
                  <span className="text-3xl">example</span>
                  <p className="text-xs font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    €{item.price.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right current order */}
          <div className="w-80 bg-white border-l border-gray-100 flex flex-col h-full">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-base">
                Table #{tab.tableNumber}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {orderId ? `Order #{orderId}` : "No order"}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {orderId === null && pendingItems.length === 0 && (
                <p className="text-gray-400 text-sm">Add items from the menu</p>
              )}
              {orderId === null &&
                pendingItems.map((p) => (
                  <div
                    key={p.menuItem.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {p.menuItem.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        €{p.menuItem.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setPendingItems((prev) =>
                            p.quantity === 1
                              ? prev.filter(
                                  (i) => i.menuItem.id !== p.menuItem.id,
                                )
                              : prev.map((i) =>
                                  i.menuItem.id === p.menuItem.id
                                    ? { ...i, quantity: i.quantity - 1 }
                                    : i,
                                ),
                          )
                        }
                        className="w-6 h-6 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {p.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setPendingItems((prev) =>
                            prev.map((i) =>
                              i.menuItem.id === p.menuItem.id
                                ? { ...i, quantity: i.quantity + 1 }
                                : i,
                            ),
                          )
                        }
                        className="w-6 h-6 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:bg-gray-50"
                      ></button>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 w-14 text-right">
                      €{(p.menuItem.price * p.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              {orderId !== null && orderItems.length === 0 && (
                <p className="text-gray-400 text-sm">No items yet</p>
              )}

              {orderId !== null &&
                orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.menuItemName}
                      </p>
                      <p className="text-xs text-gray-400">
                        €{item.unitPrice.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => changeQuantity(item, -1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => changeQuantity(item, 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-sm flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 w-14 text-right">
                      €{item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                ))}
            </div>
            <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">Total</span>
              <span className="text-sm font-bold text-gray-800">
                €
                {(orderId === null
                  ? pendingItems.reduce(
                      (sum, p) => sum + p.menuItem.price * p.quantity,
                      0,
                    )
                  : totalAmount
                ).toFixed(2)}
              </span>
            </div>
            <div className="px-6 py-4">
              <button
                onClick={async () => {
                  if (!orderId && pendingItems.length > 0) {
                    //Create order first
                    const res = await api.post("/orders", {
                      tabId: tab.id,
                      userId: user?.id,
                    });
                    const newOrderId = res.data.id;

                    //updates teh table to occupied
                    await api.patch(`/tabs/${tab.id}/status`, {
                      tableStatus: "occupied",
                    });

                    //adds all the items that are in pending one by one
                    for (const p of pendingItems) {
                      await api.post(`/orders/${newOrderId}/items`, {
                        menuItemId: p.menuItem.id,
                        quantity: p.quantity,
                      });
                    }
                  }
                  navigate("/dashboard");
                }}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-colors"
                style={{ background: "#0C2B4E" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
