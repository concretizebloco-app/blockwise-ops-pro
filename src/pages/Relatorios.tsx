import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Factory,
  Calendar as CalendarIcon,
  Clock,
  FileSpreadsheet
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const relatoriosMock = [
  {
    id: 1,
    nome: "Relatório de Produção Mensal",
    categoria: "producao",
    tipo: "PDF",
    dataGeracao: "2024-01-15 14:30",
    periodo: "Janeiro 2024",
    status: "concluido",
    tamanho: "2.3 MB"
  },
  {
    id: 2,
    nome: "Demonstrativo Financeiro",
    categoria: "financeiro",
    tipo: "Excel",
    dataGeracao: "2024-01-14 09:15",
    periodo: "Q4 2023",
    status: "concluido",
    tamanho: "1.8 MB"
  },
  {
    id: 3,
    nome: "Análise de Qualidade - Traços",
    categoria: "qualidade",
    tipo: "PDF",
    dataGeracao: "2024-01-12 16:45",
    periodo: "Dezembro 2023",
    status: "processando",
    tamanho: "-"
  },
  {
    id: 4,
    nome: "Relatório de Clientes",
    categoria: "comercial",
    tipo: "PDF",
    dataGeracao: "2024-01-10 11:20",
    periodo: "2023",
    status: "concluido",
    tamanho: "950 KB"
  }
];

const tiposRelatorio = [
  {
    id: "producao",
    nome: "Produção",
    descricao: "Volume produzido, OPs, eficiência",
    icon: Factory,
    color: "bg-blue-500/10 text-blue-600 border-blue-200"
  },
  {
    id: "financeiro", 
    nome: "Financeiro",
    descricao: "DRE, fluxo de caixa, contas",
    icon: DollarSign,
    color: "bg-green-500/10 text-green-600 border-green-200"
  },
  {
    id: "comercial",
    nome: "Comercial", 
    descricao: "Vendas, clientes, comissões",
    icon: Users,
    color: "bg-purple-500/10 text-purple-600 border-purple-200"
  },
  {
    id: "qualidade",
    nome: "Qualidade",
    descricao: "Testes, aprovações, traços",
    icon: BarChart3,
    color: "bg-orange-500/10 text-orange-600 border-orange-200"
  }
];

export default function Relatorios() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return (
          <Badge variant="default" className="bg-success/10 text-success border-success/20">
            Concluído
          </Badge>
        );
      case "processando":
        return (
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
            <Clock className="w-3 h-3 mr-1" />
            Processando
          </Badge>
        );
      case "erro":
        return (
          <Badge variant="destructive">
            Erro
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    const tipo = tiposRelatorio.find(t => t.id === categoria);
    if (!tipo) return Factory;
    return tipo.icon;
  };

  const handleGerarRelatorio = () => {
    console.log("Gerando relatório...", {
      tipo: selectedTipo,
      periodo: selectedPeriodo,
      data: selectedDate
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Relatórios
          </h1>
          <p className="text-muted-foreground">
            Gere e gerencie relatórios do sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Download className="h-4 w-4" />
            Gerar Novo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Relatórios</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Este mês: 24</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processando</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">3</div>
            <p className="text-xs text-muted-foreground">Em fila</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mais Gerado</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Produção</div>
            <p className="text-xs text-muted-foreground">45% dos relatórios</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gerar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gerar">Gerar Relatório</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="agendados">Agendados</TabsTrigger>
        </TabsList>

        <TabsContent value="gerar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulário de Geração */}
            <Card>
              <CardHeader>
                <CardTitle>Configurar Relatório</CardTitle>
                <CardDescription>
                  Selecione o tipo e período para gerar o relatório
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Relatório</Label>
                  <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposRelatorio.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          <div className="flex items-center gap-2">
                            <tipo.icon className="h-4 w-4" />
                            {tipo.nome}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoje">Hoje</SelectItem>
                      <SelectItem value="semana">Esta Semana</SelectItem>
                      <SelectItem value="mes">Este Mês</SelectItem>
                      <SelectItem value="trimestre">Trimestre</SelectItem>
                      <SelectItem value="ano">Este Ano</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedPeriodo === "personalizado" && (
                  <div className="space-y-2">
                    <Label>Data Específica</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Formato</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          PDF
                        </div>
                      </SelectItem>
                      <SelectItem value="excel">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4" />
                          Excel
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleGerarRelatorio}
                  disabled={!selectedTipo || !selectedPeriodo}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>

            {/* Tipos de Relatório */}
            <Card>
              <CardHeader>
                <CardTitle>Tipos Disponíveis</CardTitle>
                <CardDescription>
                  Escolha o tipo de relatório que deseja gerar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tiposRelatorio.map((tipo) => (
                    <div
                      key={tipo.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedTipo === tipo.id ? tipo.color : "border-border hover:border-border/60"
                      }`}
                      onClick={() => setSelectedTipo(tipo.id)}
                    >
                      <div className="flex items-center gap-3">
                        <tipo.icon className="h-5 w-5" />
                        <div className="flex-1">
                          <h4 className="font-medium">{tipo.nome}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tipo.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Relatórios</CardTitle>
              <CardDescription>
                Relatórios gerados anteriormente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatoriosMock.map((relatorio) => {
                  const Icon = getCategoriaIcon(relatorio.categoria);
                  return (
                    <div
                      key={relatorio.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{relatorio.nome}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{relatorio.dataGeracao}</span>
                            <span>•</span>
                            <span>{relatorio.periodo}</span>
                            <span>•</span>
                            <span>{relatorio.tamanho}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(relatorio.status)}
                        {relatorio.status === "concluido" && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agendados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Agendados</CardTitle>
              <CardDescription>
                Configure relatórios para serem gerados automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum relatório agendado</h3>
                <p className="text-muted-foreground mb-4">
                  Configure relatórios recorrentes para serem gerados automaticamente
                </p>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Agendar Relatório
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}