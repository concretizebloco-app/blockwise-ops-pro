import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Factory, 
  Plus, 
  Search,
  Calendar,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle,
  Package,
  TrendingUp,
  Users
} from "lucide-react";

interface OrdemProducao {
  id: string;
  numero: string;
  cliente: string;
  produto: string;
  traco: string;
  quantidade: number;
  quantidadeProduzida: number;
  dataInicio: string;
  dataPrevista: string;
  status: "pendente" | "em_producao" | "concluido" | "atrasado";
  responsavel: string;
  observacoes?: string;
}

const ordens: OrdemProducao[] = [
  {
    id: "1",
    numero: "OP-2024-001",
    cliente: "Construtora ABC",
    produto: "Bloco 14x19x39",
    traco: "Traço 1:2:3",
    quantidade: 2500,
    quantidadeProduzida: 2500,
    dataInicio: "15/01/2024",
    dataPrevista: "18/01/2024",
    status: "concluido",
    responsavel: "João Silva"
  },
  {
    id: "2",
    numero: "OP-2024-002",
    cliente: "Revenda XYZ",
    produto: "Bloco 14x19x39",
    traco: "Traço 1:3:4",
    quantidade: 1800,
    quantidadeProduzida: 1200,
    dataInicio: "20/01/2024",
    dataPrevista: "23/01/2024",
    status: "em_producao",
    responsavel: "Maria Santos"
  },
  {
    id: "3",
    numero: "OP-2024-003",
    cliente: "João Pereira",
    produto: "Bloco 09x19x39",
    traco: "Traço 1:2:4",
    quantidade: 500,
    quantidadeProduzida: 0,
    dataInicio: "25/01/2024",
    dataPrevista: "26/01/2024",
    status: "pendente",
    responsavel: "Carlos Lima"
  },
  {
    id: "4",
    numero: "OP-2024-004",
    cliente: "Construtora DEF",
    produto: "Bloco 14x19x39",
    traco: "Traço 1:2:3",
    quantidade: 3200,
    quantidadeProduzida: 800,
    dataInicio: "22/01/2024",
    dataPrevista: "24/01/2024",
    status: "atrasado",
    responsavel: "Ana Costa"
  }
];

export default function Producao() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ordensProducao] = useState<OrdemProducao[]>(ordens);

  const filteredOrdens = ordensProducao.filter(ordem =>
    ordem.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordem.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ordem.produto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "em_producao":
        return <Play className="h-4 w-4 text-primary" />;
      case "atrasado":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Concluído</Badge>;
      case "em_producao":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Em Produção</Badge>;
      case "atrasado":
        return <Badge variant="destructive">Atrasado</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  const getProgressPercentage = (produzida: number, total: number) => {
    return Math.round((produzida / total) * 100);
  };

  const estatisticas = {
    totalOrdens: ordensProducao.length,
    emProducao: ordensProducao.filter(o => o.status === "em_producao").length,
    concluidas: ordensProducao.filter(o => o.status === "concluido").length,
    atrasadas: ordensProducao.filter(o => o.status === "atrasado").length,
    totalProduzido: ordensProducao.reduce((acc, o) => acc + o.quantidadeProduzida, 0)
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Controle de Produção</h1>
          <p className="text-muted-foreground">
            Gerencie ordens de produção e acompanhe o desempenho da fábrica
          </p>
        </div>
        <Button className="bg-gradient-to-r from-accent to-accent-hover">
          <Plus className="h-4 w-4 mr-2" />
          Nova Ordem de Produção
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por número, cliente ou produto..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Filtrar Período
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Factory className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{estatisticas.totalOrdens}</p>
                <p className="text-sm text-muted-foreground">Total OPs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Play className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{estatisticas.emProducao}</p>
                <p className="text-sm text-muted-foreground">Em Produção</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{estatisticas.concluidas}</p>
                <p className="text-sm text-muted-foreground">Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{estatisticas.atrasadas}</p>
                <p className="text-sm text-muted-foreground">Atrasadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{(estatisticas.totalProduzido / 1000).toFixed(1)}k</p>
                <p className="text-sm text-muted-foreground">Blocos Produzidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Orders List */}
      <div className="space-y-4">
        {filteredOrdens.map((ordem) => {
          const progressPercentage = getProgressPercentage(ordem.quantidadeProduzida, ordem.quantidade);
          
          return (
            <Card key={ordem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <Factory className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{ordem.numero}</CardTitle>
                      <p className="text-sm text-muted-foreground">Cliente: {ordem.cliente}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(ordem.status)}
                    {getStatusBadge(ordem.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Produto & Traço</p>
                    <p className="font-medium">{ordem.produto}</p>
                    <p className="text-sm text-muted-foreground">{ordem.traco}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Progresso</p>
                    <p className="font-medium">
                      {ordem.quantidadeProduzida.toLocaleString()} / {ordem.quantidade.toLocaleString()} blocos
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          ordem.status === "concluido" ? "bg-success" :
                          ordem.status === "atrasado" ? "bg-destructive" :
                          ordem.status === "em_producao" ? "bg-primary" : "bg-muted-foreground"
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">{progressPercentage}% concluído</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Datas</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Início:</span>
                        <span>{ordem.dataInicio}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Previsão:</span>
                        <span className={ordem.status === "atrasado" ? "text-destructive font-medium" : ""}>
                          {ordem.dataPrevista}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Responsável</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{ordem.responsavel}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        Editar
                      </Button>
                      <Button size="sm" className="flex-1">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}