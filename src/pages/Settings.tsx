
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Globe, CreditCard, Shield, Bell } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-2">Gerencie sua conta e preferências</p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Perfil da Conta
            </CardTitle>
            <CardDescription>
              Informações básicas da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nome</Label>
                <Input id="firstName" defaultValue="João" />
              </div>
              <div>
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input id="lastName" defaultValue="Silva" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="joao@exemplo.com" />
            </div>
            <Button>Salvar Alterações</Button>
          </CardContent>
        </Card>

        {/* Domain Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Configurações de Domínio
            </CardTitle>
            <CardDescription>
              Configure domínios personalizados para suas páginas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customDomain">Domínio Personalizado</Label>
              <Input 
                id="customDomain" 
                placeholder="meudominio.com" 
                disabled 
              />
              <p className="text-sm text-gray-500 mt-1">
                Disponível apenas no plano Pro
              </p>
            </div>
            <Button variant="outline" disabled>
              Conectar Domínio
            </Button>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Plano e Cobrança
            </CardTitle>
            <CardDescription>
              Gerencie seu plano atual e método de pagamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Plano Gratuito</p>
                <p className="text-sm text-gray-600">3 páginas • Analytics básico</p>
              </div>
              <Button>Fazer Upgrade</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configure a segurança da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div>
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button>Alterar Senha</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure suas preferências de notificação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Relatórios por Email</p>
                  <p className="text-sm text-gray-600">Receba relatórios semanais</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novos Recursos</p>
                  <p className="text-sm text-gray-600">Seja notificado sobre atualizações</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
