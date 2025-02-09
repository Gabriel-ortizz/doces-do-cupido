import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Package, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const AdminDashboard: React.FC = () => {
  const salesData = [
    { name: "Jan", total: 4000 },
    { name: "Feb", total: 3000 },
    { name: "Mar", total: 2000 },
    { name: "Apr", total: 2780 },
    { name: "May", total: 1890 },
  ];

  const categoryData = [
    { name: "Categoria 1", value: 400 },
    { name: "Categoria 2", value: 300 },
    { name: "Categoria 3", value: 300 },
    { name: "Categoria 4", value: 200 },
  ];

  return (
    <div className="p-6 space-y-6 overflow-auto h-screen">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Total de Pedidos</p>
              <h2 className="text-xl font-bold">245</h2>
            </div>
            <ShoppingCart className="text-blue-500 w-6 h-6" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Produtos em Estoque</p>
              <h2 className="text-xl font-bold">128</h2>
            </div>
            <Package className="text-green-500 w-6 h-6" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-gray-500">Faturamento</p>
              <h2 className="text-xl font-bold">R$ 12.540</h2>
            </div>
            <TrendingUp className="text-red-500 w-6 h-6" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Vendas Mensais</h2>
            <BarChart width={500} height={300} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Categorias Mais Vendidas</h2>
            <PieChart width={400} height={400}>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 250 ? "#82ca9d" : "#8884d8"} />
                ))}
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 overflow-auto max-h-[400px]">
          <h2 className="text-lg font-semibold mb-4">Últimos Pedidos</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>#001</TableCell>
                <TableCell>João Silva</TableCell>
                <TableCell>R$ 55,00</TableCell>
                <TableCell className="text-green-600">Pago</TableCell>
                <TableCell>
                  <Button className="border border-gray-300 text-gray-700 px-3 py-1 text-sm rounded">Ver</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#002</TableCell>
                <TableCell>Maria Souza</TableCell>
                <TableCell>R$ 30,00</TableCell>
                <TableCell className="text-yellow-600">Pendente</TableCell>
                <TableCell>
                  <Button className="border border-gray-300 text-gray-700 px-3 py-1 text-sm rounded">Ver</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
