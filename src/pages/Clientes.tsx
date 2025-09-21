import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Users,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Building2,
  User
} from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  documento: string;
  tipo: "pessoa_fisica" | "construtora" | "revenda";
  contato: string;
  telefone: string;
  email: string;
  endereco: string;
  limiteCredito: string;
  creditoUtilizado: string;
  status: "ativo" | "inativo" | "bloqueado";
  ultimaCompra: string;
  totalCompras: string;
}

const clientesMock: Cliente[] = [
  {
    id: "1",
    nome: "Construtora ABC Ltda",
    documento: "12.345.678/0001-90",
    tipo: "construtora",
    contato: "Roberto Silva",
    telefone: "(11) 9999-1234",
    email: "roberto@construtorabc.com",
    endereco: "Av. Paulista, 1000 - São Paulo, SP",
    limiteCredito: "R$ 500.000",
    creditoUtilizado: "R$ 125.000",
    status: "ativo",
    ultimaCompra: "20/01/2024",
    totalCompras: "R$ 2.850.000"
  },
  {
    id: "2",
    nome: "Revenda Material XYZ",
    documento: "98.765.432/0001-10",
    tipo: "revenda",
    contato: "Ana Costa",
    telefone: "(11) 8888-5678",
    email: "ana@revendaxyz.com",
    endereco: "Rua das Flores, 500 - Guarulhos, SP",
    limiteCredito: "R$ 200.000",
    creditoUtilizado: "R$ 45.000",
    status: "ativo",
    ultimaCompra: "18/01/2024",
    totalCompras: "R$ 890.000"
  },
  {
    id: "3",
    nome: "João Pereira Silva",
    documento: "123.456.789-00",
    tipo: "pessoa_fisica",
    contato: "João Silva",
    telefone: "(11) 7777-9012",
    email: "joao.silva@email.com",
    endereco: "Rua dos Pinheiros, 123 - São Paulo, SP",
    limiteCredito: "R$ 15.000",
    creditoUtilizado: "R$ 2.500",
    status: "ativo",
    ultimaCompra: "15/01/2024",
    totalCompras: "R$ 28.500"
  }
];

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes] = useState<Cliente[]>(clientesMock);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.contato.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "construtora":
        return Building2;
      case "revenda":
        return Users;
      default:
        return User;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "construtora":
        return "Construtora";
      case "revenda":
        return "Revenda";
      default:
        return "Pessoa Física";
    }
  };

  const getCreditoPercentual = (utilizado: string, limite: string) => {
    const utilizadoNum = parseFloat(utilizado.replace(/[R$.\s]/g, '').replace(',', '.'));
    const limiteNum = parseFloat(limite.replace(/[R$.\s]/g, '').replace(',', '.'));
    return Math.round((utilizadoNum / limiteNum) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie sua base de clientes e relacionamentos comerciais
          </p>
        </div>
        <Button className="bg-gradient-to-r from-accent to-accent-hover">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, endereço ou contato..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Construtoras</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 2.8M</p>
                <p className="text-sm text-muted-foreground">Limite Total</p>
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
                <p className="text-2xl font-bold">R$ 485k</p>
                <p className="text-sm text-muted-foreground">Crédito Utilizado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers List */}
      <div className="grid gap-6">
        {filteredClientes.map((cliente) => {
          const TipoIcon = getTipoIcon(cliente.tipo);
          const creditoPercentual = getCreditoPercentual(cliente.creditoUtilizado, cliente.limiteCredito);
          
          return (
            <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <TipoIcon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cliente.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {cliente.tipo === "pessoa_fisica" ? "CPF" : "CNPJ"}: {cliente.documento}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{getTipoLabel(cliente.tipo)}</Badge>
                    <Badge variant={cliente.status === "ativo" ? "default" : cliente.status === "bloqueado" ? "destructive" : "secondary"}>
                      {cliente.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{cliente.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{cliente.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{cliente.endereco}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-3">Limite de Crédito</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilizado:</span>
                        <span className="font-medium">{cliente.creditoUtilizado}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Limite:</span>
                        <span className="font-medium">{cliente.limiteCredito}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            creditoPercentual > 80 ? 'bg-destructive' : 
                            creditoPercentual > 60 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${creditoPercentual}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{creditoPercentual}% utilizado</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Última Compra:</span>
                      <span className="font-medium">{cliente.ultimaCompra}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Compras:</span>
                      <span className="font-medium text-success">{cliente.totalCompras}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        Editar
                      </Button>
                      <Button size="sm" className="flex-1">
                        Ver Pedidos
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