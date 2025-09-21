import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Beaker, Plus, Edit, TestTube, AlertTriangle, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  tipo: z.string().min(1, "Tipo é obrigatório"),
  cimento: z.string().min(1, "Quantidade de cimento é obrigatória"),
  areia: z.string().min(1, "Quantidade de areia é obrigatória"),
  brita: z.string().min(1, "Quantidade de brita é obrigatória"),
  agua: z.string().min(1, "Quantidade de água é obrigatória"),
  aditivos: z.string().optional(),
  observacoes: z.string().optional(),
});

const tracosMock = [
  {
    id: 1,
    nome: "Traço Standard 15MPa",
    tipo: "Bloco Estrutural",
    cimento: "350kg",
    areia: "650kg",
    brita: "1200kg",
    agua: "175L",
    aditivos: "Plastificante 2L",
    resistencia: "15 MPa",
    status: "ativo",
    ultimoTeste: "2024-01-15",
    lotes: 45,
  },
  {
    id: 2,
    nome: "Traço Premium 20MPa",
    tipo: "Bloco Vedação",
    cimento: "400kg",
    areia: "600kg",
    brita: "1100kg",
    agua: "160L",
    aditivos: "Superplastificante 3L",
    resistencia: "20 MPa",
    status: "ativo",
    ultimoTeste: "2024-01-12",
    lotes: 23,
  },
  {
    id: 3,
    nome: "Traço Econômico 10MPa",
    tipo: "Bloco Comum",
    cimento: "300kg",
    areia: "700kg",
    brita: "1300kg",
    agua: "180L",
    aditivos: "-",
    resistencia: "10 MPa",
    status: "inativo",
    ultimoTeste: "2023-12-20",
    lotes: 12,
  },
];

const testesMock = [
  {
    id: 1,
    traco: "Traço Standard 15MPa",
    data: "2024-01-15",
    resistencia: "16.2 MPa",
    slump: "8cm",
    resultado: "aprovado",
    responsavel: "João Silva",
  },
  {
    id: 2,
    traco: "Traço Premium 20MPa", 
    data: "2024-01-12",
    resistencia: "21.8 MPa",
    slump: "10cm",
    resultado: "aprovado",
    responsavel: "Maria Santos",
  },
  {
    id: 3,
    traco: "Traço Standard 15MPa",
    data: "2024-01-10",
    resistencia: "13.5 MPa",
    slump: "6cm",
    resultado: "reprovado",
    responsavel: "João Silva",
  },
];

export default function Tracos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTraco, setSelectedTraco] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      tipo: "",
      cimento: "",
      areia: "",
      brita: "",
      agua: "",
      aditivos: "",
      observacoes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsDialogOpen(false);
    form.reset();
  }

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge variant="default" className="bg-success/10 text-success border-success/20">
        <CheckCircle className="w-3 h-3 mr-1" />
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        Inativo
      </Badge>
    );
  };

  const getResultadoBadge = (resultado: string) => {
    return resultado === "aprovado" ? (
      <Badge variant="default" className="bg-success/10 text-success border-success/20">
        <CheckCircle className="w-3 h-3 mr-1" />
        Aprovado
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Reprovado
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Beaker className="h-6 w-6 text-primary" />
            Controle de Traços
          </h1>
          <p className="text-muted-foreground">
            Gerencie fórmulas de concreto e controle de qualidade
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Traço
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Traço</DialogTitle>
              <DialogDescription>
                Defina as proporções e características do traço de concreto
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Traço</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Traço Standard 15MPa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Bloco</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="estrutural">Bloco Estrutural</SelectItem>
                            <SelectItem value="vedacao">Bloco Vedação</SelectItem>
                            <SelectItem value="comum">Bloco Comum</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cimento (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="350" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="areia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areia (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="650" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brita"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brita (kg)</FormLabel>
                        <FormControl>
                          <Input placeholder="1200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agua"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Água (L)</FormLabel>
                        <FormControl>
                          <Input placeholder="175" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="aditivos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aditivos (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Plastificante 2L" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Informações adicionais sobre o traço" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Traço</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tracos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tracos">Traços Cadastrados</TabsTrigger>
          <TabsTrigger value="testes">Testes de Qualidade</TabsTrigger>
        </TabsList>

        <TabsContent value="tracos" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Traços</CardTitle>
                <Beaker className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 ativos, 1 inativo</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Traços Ativos</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">2</div>
                <p className="text-xs text-muted-foreground">Em uso na produção</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lotes Produzidos</CardTitle>
                <TestTube className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">80</div>
                <p className="text-xs text-muted-foreground">Este mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Última Análise</CardTitle>
                <AlertTriangle className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15/01</div>
                <p className="text-xs text-muted-foreground">Há 6 dias</p>
              </CardContent>
            </Card>
          </div>

          {/* Traços Table */}
          <Card>
            <CardHeader>
              <CardTitle>Traços Cadastrados</CardTitle>
              <CardDescription>
                Lista de todas as fórmulas de concreto cadastradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Composição</TableHead>
                    <TableHead>Resistência</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Lotes</TableHead>
                    <TableHead>Último Teste</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tracosMock.map((traco) => (
                    <TableRow key={traco.id}>
                      <TableCell className="font-medium">{traco.nome}</TableCell>
                      <TableCell>{traco.tipo}</TableCell>
                      <TableCell className="text-sm">
                        <div>C:{traco.cimento} A:{traco.areia}</div>
                        <div className="text-muted-foreground">B:{traco.brita} Á:{traco.agua}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {traco.resistencia}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(traco.status)}</TableCell>
                      <TableCell>{traco.lotes}</TableCell>
                      <TableCell>{traco.ultimoTeste}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Testes de Qualidade</CardTitle>
              <CardDescription>
                Registros de testes de resistência e slump realizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Traço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Resistência</TableHead>
                    <TableHead>Slump Test</TableHead>
                    <TableHead>Resultado</TableHead>
                    <TableHead>Responsável</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testesMock.map((teste) => (
                    <TableRow key={teste.id}>
                      <TableCell className="font-medium">{teste.traco}</TableCell>
                      <TableCell>{teste.data}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {teste.resistencia}
                        </Badge>
                      </TableCell>
                      <TableCell>{teste.slump}</TableCell>
                      <TableCell>{getResultadoBadge(teste.resultado)}</TableCell>
                      <TableCell>{teste.responsavel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}