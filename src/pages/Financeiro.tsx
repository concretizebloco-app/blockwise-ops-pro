import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface ContaFinanceira {
  id: string;
  tipo: "receber" | "pagar";
  descricao: string;
  valor: string;
  vencimento: string;
  status: "pendente" | "vencido" | "pago";
  cliente?: string;
  fornecedor?: string;
  categoria: string;
}

const contasMock: ContaFinanceira[] = [
  {
    id: "1",
    tipo: "receber",
    descricao: "Venda de blocos - OP-2024-001",
    valor: "R$ 45.800",
    vencimento: "25/01/2024",
    status: "pendente",
    cliente: "Construtora ABC",
    categoria: "Vendas"
  },
  {
    id: "2",
    tipo: "pagar",
    descricao: "Compra de cimento - NF 12345",
    valor: "R$ 28.500",
    vencimento: "20/01/2024",
    status: "vencido",
    fornecedor: "Cimento Forte Ltda",
    categoria: "Matéria-prima"
  },
  {
    id: "3",
    tipo: "receber",
    descricao: "Venda de blocos - OP-2024-002",
    valor: "R$ 32.100",
    vencimento: "30/01/2024",
    status: "pago",
    cliente: "Revenda XYZ",
    categoria: "Vendas"
  },
  {
    id: "4",
    tipo: "pagar",
    descricao: "Energia elétrica - Janeiro",
    valor: "R$ 8.750",
    vencimento: "15/01/2024",
    status: "pago",
    categoria: "Operacional"
  }
];

export default function Financeiro() {
  const [contas] = useState<ContaFinanceira[]>(contasMock);

  const contasReceber = contas.filter(conta => conta.tipo === "receber");
  const contasPagar = contas.filter(conta => conta.tipo === "pagar");

  const totalReceber = contasReceber
    .filter(conta => conta.status !== "pago")
    .reduce((acc, conta) => acc + parseFloat(conta.valor.replace(/[R$.\s]/g, '').replace(',', '.')), 0);

  const totalPagar = contasPagar
    .filter(conta => conta.status !== "pago")
    .reduce((acc, conta) => acc + parseFloat(conta.valor.replace(/[R$.\s]/g, '').replace(',', '.')), 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pago":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "vencido":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Pago</Badge>;
      case "vencido":
        return <Badge variant="destructive">Vencido</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Controle Financeiro</h1>
          <p className="text-muted-foreground">
            Gerencie contas a pagar, receber e fluxo de caixa
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filtrar Período
          </Button>
          <Button className="bg-gradient-to-r from-accent to-accent-hover">
            <DollarSign className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">
                  R$ {(totalReceber / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-success/80">A Receber</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">
                  R$ {(totalPagar / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-destructive/80">A Pagar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  R$ {((totalReceber - totalPagar) / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-primary/80">Saldo Projetado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 125k</p>
                <p className="text-sm text-muted-foreground">Faturamento Mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Tabs */}
      <Tabs defaultValue="receber" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="receber">Contas a Receber</TabsTrigger>
          <TabsTrigger value="pagar">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="fluxo">Fluxo de Caixa</TabsTrigger>
        </TabsList>

        <TabsContent value="receber">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Contas a Receber
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contasReceber.map((conta) => (
                  <div key={conta.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(conta.status)}
                      <div>
                        <p className="font-medium">{conta.descricao}</p>
                        <p className="text-sm text-muted-foreground">
                          Cliente: {conta.cliente} • Vence em: {conta.vencimento}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-success">{conta.valor}</p>
                        <p className="text-xs text-muted-foreground">{conta.categoria}</p>
                      </div>
                      {getStatusBadge(conta.status)}
                      <Button variant="outline" size="sm">
                        Ações
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-destructive" />
                Contas a Pagar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contasPagar.map((conta) => (
                  <div key={conta.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(conta.status)}
                      <div>
                        <p className="font-medium">{conta.descricao}</p>
                        <p className="text-sm text-muted-foreground">
                          {conta.fornecedor ? `Fornecedor: ${conta.fornecedor}` : "Despesa operacional"} • Vence em: {conta.vencimento}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-destructive">{conta.valor}</p>
                        <p className="text-xs text-muted-foreground">{conta.categoria}</p>
                      </div>
                      {getStatusBadge(conta.status)}
                      <Button variant="outline" size="sm">
                        Ações
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fluxo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Fluxo de Caixa - Próximos 30 dias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Cash Flow Chart Placeholder */}
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <DollarSign className="h-12 w-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Gráfico de Fluxo de Caixa</p>
                    <p className="text-sm text-muted-foreground">Visualização interativa das entradas e saídas</p>
                  </div>
                </div>

                {/* Weekly Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-success/20">
                    <CardHeader>
                      <CardTitle className="text-success text-sm">Esta Semana - Entradas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-success">R$ 78.200</p>
                      <p className="text-sm text-muted-foreground">3 recebimentos previstos</p>
                    </CardContent>
                  </Card>

                  <Card className="border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-destructive text-sm">Esta Semana - Saídas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-destructive">R$ 42.300</p>
                      <p className="text-sm text-muted-foreground">5 pagamentos previstos</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}