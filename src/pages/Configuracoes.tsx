import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Mail, 
  Phone,
  Building,
  MapPin,
  FileText,
  Key,
  Users,
  Clock,
  Save,
  Eye,
  EyeOff
} from "lucide-react";

const usuariosMock = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@empresa.com",
    cargo: "Administrador",
    departamento: "TI",
    status: "ativo",
    ultimoAcesso: "2024-01-15 14:30"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@empresa.com", 
    cargo: "Supervisor Produção",
    departamento: "Produção",
    status: "ativo",
    ultimoAcesso: "2024-01-15 12:45"
  },
  {
    id: 3,
    nome: "Carlos Oliveira",
    email: "carlos@empresa.com",
    cargo: "Analista Financeiro", 
    departamento: "Financeiro",
    status: "inativo",
    ultimoAcesso: "2024-01-10 09:15"
  }
];

export default function Configuracoes() {
  const [showPassword, setShowPassword] = useState(false);
  const [configuracoes, setConfiguracoes] = useState({
    // Empresa
    nomeEmpresa: "Blocos Concreto Ltda",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Industrial, 123",
    cidade: "São Paulo",
    telefone: "(11) 99999-9999",
    email: "contato@empresa.com",
    
    // Sistema
    backupAutomatico: true,
    notificacoesPush: true,
    notificacoesEmail: false,
    tema: "sistema",
    idioma: "pt-BR",
    
    // Segurança
    senhaObrigatoria: true,
    duploFator: false,
    sessaoExpiracao: 480, // minutos
    
    // Produção
    alertaEstoqueBaixo: true,
    limiteEstoqueMinimo: 50,
    validacaoQualidade: true,
  });

  const handleSave = () => {
    console.log("Salvando configurações...", configuracoes);
  };

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge variant="default" className="bg-success/10 text-success border-success/20">
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-muted text-muted-foreground">
        Inativo
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema e da empresa
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="empresa" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="empresa">Empresa</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="empresa" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Dados da Empresa
                </CardTitle>
                <CardDescription>
                  Informações básicas da empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Razão Social</Label>
                  <Input
                    value={configuracoes.nomeEmpresa}
                    onChange={(e) => setConfiguracoes(prev => ({...prev, nomeEmpresa: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input
                    value={configuracoes.cnpj}
                    onChange={(e) => setConfiguracoes(prev => ({...prev, cnpj: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <Input
                    value={configuracoes.endereco}
                    onChange={(e) => setConfiguracoes(prev => ({...prev, endereco: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input
                    value={configuracoes.cidade}
                    onChange={(e) => setConfiguracoes(prev => ({...prev, cidade: e.target.value}))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contato
                </CardTitle>
                <CardDescription>
                  Informações de contato da empresa
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={configuracoes.telefone}
                    onChange={(e) => setConfiguracoes(prev => ({...prev, telefone: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    value={configuracoes.email}
                    onChange={(e) => setConfiguracoes(prev => ({...prev, email: e.target.value}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input placeholder="https://www.empresa.com" />
                </div>

                <div className="space-y-2">
                  <Label>Observações</Label>
                  <Textarea placeholder="Informações adicionais da empresa" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
                <CardDescription>
                  Configure como receber alertas do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações no navegador
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.notificacoesPush}
                    onCheckedChange={(checked) => 
                      setConfiguracoes(prev => ({...prev, notificacoesPush: checked}))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber resumos por e-mail
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.notificacoesEmail}
                    onCheckedChange={(checked) => 
                      setConfiguracoes(prev => ({...prev, notificacoesEmail: checked}))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Backup diário automático
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.backupAutomatico}
                    onCheckedChange={(checked) => 
                      setConfiguracoes(prev => ({...prev, backupAutomatico: checked}))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Aparência
                </CardTitle>
                <CardDescription>
                  Personalização visual do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <Select 
                    value={configuracoes.tema} 
                    onValueChange={(value) => 
                      setConfiguracoes(prev => ({...prev, tema: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claro">Claro</SelectItem>
                      <SelectItem value="escuro">Escuro</SelectItem>
                      <SelectItem value="sistema">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select 
                    value={configuracoes.idioma}
                    onValueChange={(value) => 
                      setConfiguracoes(prev => ({...prev, idioma: value}))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Limite de Estoque Mínimo (%)</Label>
                  <Input
                    type="number"
                    value={configuracoes.limiteEstoqueMinimo}
                    onChange={(e) => 
                      setConfiguracoes(prev => ({...prev, limiteEstoqueMinimo: Number(e.target.value)}))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Políticas de Segurança
                </CardTitle>
                <CardDescription>
                  Configure as políticas de acesso e segurança
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Senha Obrigatória</Label>
                    <p className="text-sm text-muted-foreground">
                      Exigir senha para acessar o sistema
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.senhaObrigatoria}
                    onCheckedChange={(checked) => 
                      setConfiguracoes(prev => ({...prev, senhaObrigatoria: checked}))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Aumenta a segurança com segundo fator
                    </p>
                  </div>
                  <Switch
                    checked={configuracoes.duploFator}
                    onCheckedChange={(checked) => 
                      setConfiguracoes(prev => ({...prev, duploFator: checked}))
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Tempo de Expiração da Sessão (minutos)</Label>
                  <Input
                    type="number"
                    value={configuracoes.sessaoExpiracao}
                    onChange={(e) => 
                      setConfiguracoes(prev => ({...prev, sessaoExpiracao: Number(e.target.value)}))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Alteração de Senha
                </CardTitle>
                <CardDescription>
                  Altere sua senha de acesso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Senha Atual</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha atual"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nova Senha</Label>
                  <Input type="password" placeholder="Digite a nova senha" />
                </div>

                <div className="space-y-2">
                  <Label>Confirmar Nova Senha</Label>
                  <Input type="password" placeholder="Confirme a nova senha" />
                </div>

                <Button variant="outline" className="w-full">
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciar Usuários
              </CardTitle>
              <CardDescription>
                Lista de usuários com acesso ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usuariosMock.map((usuario) => (
                  <div
                    key={usuario.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{usuario.nome}</h4>
                        <div className="text-sm text-muted-foreground">
                          {usuario.email} • {usuario.cargo}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Último acesso: {usuario.ultimoAcesso}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(usuario.status)}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Adicionar Novo Usuário
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup e Restauração
                </CardTitle>
                <CardDescription>
                  Gerencie backups dos dados do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Último Backup</h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    15/01/2024 às 03:00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tamanho: 245 MB
                  </p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    Fazer Backup Agora
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Restaurar Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Backup</CardTitle>
                <CardDescription>
                  Configure quando e como fazer backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Frequência do Backup</Label>
                  <Select defaultValue="diario">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diário</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensal">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Horário do Backup</Label>
                  <Input type="time" defaultValue="03:00" />
                </div>

                <div className="space-y-2">
                  <Label>Retenção (dias)</Label>
                  <Input type="number" defaultValue="30" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-muted-foreground">
                      Executar backup automaticamente
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}