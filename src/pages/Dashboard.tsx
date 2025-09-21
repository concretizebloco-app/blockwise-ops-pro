import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Factory, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Package,
  Calendar,
  Clock
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das operações industriais
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filtrar Período
          </Button>
          <Button size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Relatório Completo
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Produção do Dia"
          value="2.847"
          change="+12% vs ontem"
          changeType="positive"
          icon={Factory}
          description="Blocos produzidos"
        />
        
        <KPICard
          title="Faturamento Mensal"
          value="R$ 847k"
          change="+8% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          description="Receita bruta"
        />
        
        <KPICard
          title="Clientes Ativos"
          value="156"
          change="4 novos esta semana"
          changeType="positive"
          icon={Users}
          description="Base de clientes"
        />
        
        <KPICard
          title="Estoque Crítico"
          value="3"
          change="2 itens abaixo do mínimo"
          changeType="negative"
          icon={AlertTriangle}
          description="Matérias-primas"
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-primary" />
              Produção por Traço (7 dias)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Traço 1:2:3</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">12.5k</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Traço 1:3:4</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">8.2k</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Traço 1:2:4</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">5.8k</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Ordens de Produção Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">OP-2024-001</p>
                  <p className="text-sm text-muted-foreground">Construtora ABC</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">2.500 blocos</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    Concluído
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">OP-2024-002</p>
                  <p className="text-sm text-muted-foreground">Revenda XYZ</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">1.800 blocos</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                    Em Produção
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">OP-2024-003</p>
                  <p className="text-sm text-muted-foreground">João Silva</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">500 blocos</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="font-medium">Vencimento de Contrato</p>
                <p className="text-sm text-muted-foreground">
                  Contrato com Fornecedor Cimento Forte vence em 5 dias
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10">
              <Package className="h-4 w-4 text-destructive" />
              <div>
                <p className="font-medium">Estoque Baixo</p>
                <p className="text-sm text-muted-foreground">
                  Areia fina com apenas 15m³ restantes (mínimo: 50m³)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}