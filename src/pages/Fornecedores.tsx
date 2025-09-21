import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Truck,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp
} from "lucide-react";

interface Fornecedor {
  id: string;
  razaoSocial: string;
  cnpj: string;
  contato: string;
  telefone: string;
  email: string;
  cidade: string;
  produtos: string[];
  avaliacao: number;
  status: "ativo" | "inativo";
  ultimaCompra: string;
  valorTotal: string;
}

const fornecedoresMock: Fornecedor[] = [
  {
    id: "1",
    razaoSocial: "Cimento Forte Ltda",
    cnpj: "12.345.678/0001-90",
    contato: "João Santos",
    telefone: "(11) 9999-1234",
    email: "joao@cimentoforte.com",
    cidade: "São Paulo, SP",
    produtos: ["Cimento CP-II", "Cimento CP-III"],
    avaliacao: 4.8,
    status: "ativo",
    ultimaCompra: "15/01/2024",
    valorTotal: "R$ 125.800"
  },
  {
    id: "2",
    razaoSocial: "Areia & Brita São José",
    cnpj: "98.765.432/0001-10",
    contato: "Maria Silva",
    telefone: "(11) 8888-5678",
    email: "maria@sanjose.com",
    cidade: "Guarulhos, SP",
    produtos: ["Areia Média", "Brita 1", "Brita 2"],
    avaliacao: 4.5,
    status: "ativo",
    ultimaCompra: "10/01/2024",
    valorTotal: "R$ 89.500"
  },
  {
    id: "3",
    razaoSocial: "Aditivos Químicos Pro",
    cnpj: "55.444.333/0001-22",
    contato: "Carlos Mendes",
    telefone: "(11) 7777-9012",
    email: "carlos@aditivospro.com",
    cidade: "Osasco, SP",
    produtos: ["Plastificante", "Impermeabilizante"],
    avaliacao: 4.2,
    status: "inativo",
    ultimaCompra: "28/12/2023",
    valorTotal: "R$ 23.700"
  }
];

export default function Fornecedores() {
  const [searchTerm, setSearchTerm] = useState("");
  const [fornecedores] = useState<Fornecedor[]>(fornecedoresMock);

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.produtos.some(produto => 
      produto.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "text-warning fill-warning" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie sua rede de fornecedores e parceiros
          </p>
        </div>
        <Button className="bg-gradient-to-r from-accent to-accent-hover">
          <Plus className="h-4 w-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por razão social, cidade ou produtos..." 
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
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Total Fornecedores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-muted-foreground">Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.6</p>
                <p className="text-sm text-muted-foreground">Avaliação Média</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">R$ 2.1M</p>
                <p className="text-sm text-muted-foreground">Volume Anual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers List */}
      <div className="grid gap-6">
        {filteredFornecedores.map((fornecedor) => (
          <Card key={fornecedor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{fornecedor.razaoSocial}</CardTitle>
                    <p className="text-sm text-muted-foreground">CNPJ: {fornecedor.cnpj}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={fornecedor.status === "ativo" ? "default" : "secondary"}>
                    {fornecedor.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {renderStars(fornecedor.avaliacao)}
                    <span className="ml-1 text-sm text-muted-foreground">
                      {fornecedor.avaliacao}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{fornecedor.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{fornecedor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{fornecedor.cidade}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Produtos</p>
                  <div className="flex flex-wrap gap-2">
                    {fornecedor.produtos.map((produto, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {produto}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Última Compra:</span>
                    <span className="font-medium">{fornecedor.ultimaCompra}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Anual:</span>
                    <span className="font-medium text-success">{fornecedor.valorTotal}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Editar
                    </Button>
                    <Button size="sm" className="flex-1">
                      Ver Histórico
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}