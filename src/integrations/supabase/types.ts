export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string
          tenant_id: string
          code: string
          name: string
          parent_id: string
          nature: Database['public']['Enums']['account_nature']
          currency: Database['public']['Enums']['currency_code']
          is_group: boolean
          notes: string
          created_at: string
          is_active: boolean
        }
        Insert: {
          id[]: string
          tenant_id: string
          code: string
          name: string
          parent_id[]: string | null
          nature[]: Database['public']['Enums']['account_nature']
          currency[]: Database['public']['Enums']['currency_code']
          is_group[]: boolean
          notes[]: string | null
          created_at[]: string
          is_active[]: boolean
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          code?: string | null
          name?: string | null
          parent_id?: string | null
          nature?: Database['public']['Enums']['account_nature'] | null
          currency?: Database['public']['Enums']['currency_code'] | null
          is_group?: boolean | null
          notes?: string | null
          created_at?: string | null
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "19965"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "19970"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      attachments: {
        Row: {
          id: string
          tenant_id: string
          entity_type: string
          entity_id: string
          attach_type: string
          file_path: string
          file_name: string
          mime_type: string
          size_bytes: number
          notes: string
          created_by: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          entity_type: string
          entity_id: string
          attach_type[]: string
          file_path: string
          file_name: string
          mime_type[]: string | null
          size_bytes[]: number | null
          notes[]: string | null
          created_by[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          entity_type?: string | null
          entity_id?: string | null
          attach_type?: string | null
          file_path?: string | null
          file_name?: string | null
          mime_type?: string | null
          size_bytes?: number | null
          notes?: string | null
          created_by?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20822"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          id: number
          tenant_id: string
          user_id: string
          table_name: string
          record_id: string
          action: string
          old_data: Json
          new_data: Json
          created_at: string
        }
        Insert: {
          id[]: number
          tenant_id[]: string | null
          user_id[]: string | null
          table_name: string
          record_id[]: string | null
          action: string
          old_data[]: Json | null
          new_data[]: Json | null
          created_at[]: string
        }
        Update: {
          id?: number | null
          tenant_id?: string | null
          user_id?: string | null
          table_name?: string | null
          record_id?: string | null
          action?: string | null
          old_data?: Json | null
          new_data?: Json | null
          created_at?: string | null
        }
        Relationships: [
        ]
      }
      banks: {
        Row: {
          id: string
          tenant_id: string
          name: string
          branch: string
          account_no: string
          currency: Database['public']['Enums']['currency_code']
          account_id: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          name: string
          branch[]: string | null
          account_no[]: string | null
          currency[]: Database['public']['Enums']['currency_code']
          account_id[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          name?: string | null
          branch?: string | null
          account_no?: string | null
          currency?: Database['public']['Enums']['currency_code'] | null
          account_id?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20084"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20089"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      boq_items: {
        Row: {
          id: string
          tenant_id: string
          project_id: string
          item_name: string
          unit: string
          qty: Json
          unit_price: Json
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          project_id: string
          item_name: string
          unit[]: string | null
          qty[]: Json
          unit_price[]: Json
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          project_id?: string | null
          item_name?: string | null
          unit?: string | null
          qty?: Json | null
          unit_price?: Json | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20317"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20322"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      cheques: {
        Row: {
          id: string
          tenant_id: string
          cheque_no: string
          direction: string
          bank_id: string
          partner_id: string
          amount: Json
          currency: Database['public']['Enums']['currency_code']
          issue_date: string
          due_date: string
          status: string
          notes: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          cheque_no: string
          direction[]: string
          bank_id[]: string | null
          partner_id[]: string | null
          amount: Json
          currency[]: Database['public']['Enums']['currency_code']
          issue_date[]: string
          due_date[]: string
          status[]: string
          notes[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          cheque_no?: string | null
          direction?: string | null
          bank_id?: string | null
          partner_id?: string | null
          amount?: Json | null
          currency?: Database['public']['Enums']['currency_code'] | null
          issue_date?: string | null
          due_date?: string | null
          status?: string | null
          notes?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20111"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20116"
            columns: ["bank_id"]
            isOneToOne: false
            referencedRelation: "banks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20121"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          id: string
          tenant_id: string
          code: string
          name: string
          symbol: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          code: string
          name: string
          symbol[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          code?: string | null
          name?: string | null
          symbol?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20778"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      document_lines: {
        Row: {
          id: string
          tenant_id: string
          document_id: string
          product_id: string
          qty: number
          unit_price: number
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          document_id: string
          product_id: string
          qty: number
          unit_price[]: number
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          document_id?: string | null
          product_id?: string | null
          qty?: number | null
          unit_price?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20563"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20568"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20573"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          id: string
          tenant_id: string
          doc_type: string
          doc_no: number
          doc_date: string
          currency: Database['public']['Enums']['currency_code']
          exchange_rate: number
          partner_id: string
          warehouse_id: string
          to_warehouse_id: string
          project_id: string
          account_id: string
          amount: number
          notes: string
          status: string
          journal_entry_id: string
          created_by: string
          created_at: string
          settles_document_id: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          doc_type: string
          doc_no[]: number | null
          doc_date[]: string
          currency[]: Database['public']['Enums']['currency_code']
          exchange_rate[]: number
          partner_id[]: string | null
          warehouse_id[]: string | null
          to_warehouse_id[]: string | null
          project_id[]: string | null
          account_id[]: string | null
          amount[]: number
          notes[]: string | null
          status[]: string
          journal_entry_id[]: string | null
          created_by[]: string | null
          created_at[]: string
          settles_document_id[]: string | null
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          doc_type?: string | null
          doc_no?: number | null
          doc_date?: string | null
          currency?: Database['public']['Enums']['currency_code'] | null
          exchange_rate?: number | null
          partner_id?: string | null
          warehouse_id?: string | null
          to_warehouse_id?: string | null
          project_id?: string | null
          account_id?: string | null
          amount?: number | null
          notes?: string | null
          status?: string | null
          journal_entry_id?: string | null
          created_by?: string | null
          created_at?: string | null
          settles_document_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20516"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20521"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20526"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20531"
            columns: ["to_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20536"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20541"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20546"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20708"
            columns: ["settles_document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_advances: {
        Row: {
          id: string
          tenant_id: string
          employee_id: string
          adv_date: string
          amount: number
          deducted: boolean
          payroll_month: string
          notes: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          employee_id: string
          adv_date[]: string
          amount[]: number
          deducted[]: boolean
          payroll_month[]: string | null
          notes[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          employee_id?: string | null
          adv_date?: string | null
          amount?: number | null
          deducted?: boolean | null
          payroll_month?: string | null
          notes?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20937"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20942"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          id: string
          tenant_id: string
          code: string
          name: string
          job_title: string
          phone: string
          hire_date: string
          base_salary: number
          allowances: number
          currency: string
          is_active: boolean
          notes: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          code[]: string | null
          name: string
          job_title[]: string | null
          phone[]: string | null
          hire_date[]: string | null
          base_salary[]: number
          allowances[]: number
          currency[]: string
          is_active[]: boolean
          notes[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          code?: string | null
          name?: string | null
          job_title?: string | null
          phone?: string | null
          hire_date?: string | null
          base_salary?: number | null
          allowances?: number | null
          currency?: string | null
          is_active?: boolean | null
          notes?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20920"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      exchange_rates: {
        Row: {
          id: string
          tenant_id: string
          rate_date: string
          currency: Database['public']['Enums']['currency_code']
          rate_to_usd: Json
        }
        Insert: {
          id[]: string
          tenant_id: string
          rate_date[]: string
          currency[]: Database['public']['Enums']['currency_code']
          rate_to_usd: Json
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          rate_date?: string | null
          currency?: Database['public']['Enums']['currency_code'] | null
          rate_to_usd?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "19986"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      fixed_assets: {
        Row: {
          id: string
          tenant_id: string
          code: string
          name: string
          purchase_date: string
          cost: Json
          salvage_value: Json
          useful_life_years: number
          currency: Database['public']['Enums']['currency_code']
          account_id: string
          notes: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          code[]: string | null
          name: string
          purchase_date[]: string
          cost: Json
          salvage_value[]: Json
          useful_life_years[]: number
          currency[]: Database['public']['Enums']['currency_code']
          account_id[]: string | null
          notes[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          code?: string | null
          name?: string | null
          purchase_date?: string | null
          cost?: Json | null
          salvage_value?: Json | null
          useful_life_years?: number | null
          currency?: Database['public']['Enums']['currency_code'] | null
          account_id?: string | null
          notes?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20144"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20149"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_entries: {
        Row: {
          id: string
          tenant_id: string
          entry_no: number
          entry_date: string
          description: string
          currency: Database['public']['Enums']['currency_code']
          exchange_rate: Json
          doc_type: string
          created_by: string
          created_at: string
          document_id: string
          audited: boolean
          audited_at: string
          audited_by: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          entry_no: number
          entry_date[]: string
          description[]: string | null
          currency[]: Database['public']['Enums']['currency_code']
          exchange_rate[]: Json
          doc_type[]: string
          created_by[]: string | null
          created_at[]: string
          document_id[]: string | null
          audited[]: boolean
          audited_at[]: string | null
          audited_by[]: string | null
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          entry_no?: number | null
          entry_date?: string | null
          description?: string | null
          currency?: Database['public']['Enums']['currency_code'] | null
          exchange_rate?: Json | null
          doc_type?: string | null
          created_by?: string | null
          created_at?: string | null
          document_id?: string | null
          audited?: boolean | null
          audited_at?: string | null
          audited_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20591"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20030"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_lines: {
        Row: {
          id: string
          tenant_id: string
          entry_id: string
          account_id: string
          partner_id: string
          project_id: string
          description: string
          debit: Json
          credit: Json
        }
        Insert: {
          id[]: string
          tenant_id: string
          entry_id: string
          account_id: string
          partner_id[]: string | null
          project_id[]: string | null
          description[]: string | null
          debit[]: Json
          credit[]: Json
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          entry_id?: string | null
          account_id?: string | null
          partner_id?: string | null
          project_id?: string | null
          description?: string | null
          debit?: Json | null
          credit?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "20415"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20048"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20053"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20058"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20063"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          tenant_id: string
          title: string
          body: string
          created_by: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id[]: string | null
          title: string
          body[]: string | null
          created_by[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          title?: string | null
          body?: string | null
          created_by?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20759"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          id: string
          tenant_id: string
          code: string
          name: string
          partner_type: string
          phone: string
          address: string
          account_id: string
          created_at: string
          is_active: boolean
        }
        Insert: {
          id[]: string
          tenant_id: string
          code[]: string | null
          name: string
          partner_type[]: string
          phone[]: string | null
          address[]: string | null
          account_id[]: string | null
          created_at[]: string
          is_active[]: boolean
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          code?: string | null
          name?: string | null
          partner_type?: string | null
          phone?: string | null
          address?: string | null
          account_id?: string | null
          created_at?: string | null
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "20004"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20009"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_runs: {
        Row: {
          id: string
          tenant_id: string
          month: string
          total_gross: number
          total_advances: number
          total_net: number
          journal_entry_id: string
          details: Json
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          month: string
          total_gross[]: number
          total_advances[]: number
          total_net[]: number
          journal_entry_id[]: string | null
          details[]: Json | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          month?: string | null
          total_gross?: number | null
          total_advances?: number | null
          total_net?: number | null
          journal_entry_id?: string | null
          details?: Json | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20961"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20966"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          id: string
          tenant_id: string
          sku: string
          barcode: string
          name: string
          unit: string
          category: string
          reorder_level: Json
          default_warehouse_id: string
          last_purchase_price: Json
          avg_cost: Json
          qty_on_hand: Json
          currency: Database['public']['Enums']['currency_code']
          created_at: string
          is_active: boolean
          parent_id: string
          is_group: boolean
        }
        Insert: {
          id[]: string
          tenant_id: string
          sku: string
          barcode[]: string | null
          name: string
          unit[]: string
          category[]: string | null
          reorder_level[]: Json
          default_warehouse_id[]: string | null
          last_purchase_price[]: Json
          avg_cost[]: Json
          qty_on_hand[]: Json
          currency[]: Database['public']['Enums']['currency_code']
          created_at[]: string
          is_active[]: boolean
          parent_id[]: string | null
          is_group[]: boolean
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          sku?: string | null
          barcode?: string | null
          name?: string | null
          unit?: string | null
          category?: string | null
          reorder_level?: Json | null
          default_warehouse_id?: string | null
          last_purchase_price?: Json | null
          avg_cost?: Json | null
          qty_on_hand?: Json | null
          currency?: Database['public']['Enums']['currency_code'] | null
          created_at?: string | null
          is_active?: boolean | null
          parent_id?: string | null
          is_group?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "20229"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20234"
            columns: ["default_warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20861"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          tenant_id: string
          full_name: string
          email: string
          is_super_admin: boolean
          is_active: boolean
          created_at: string
          is_tenant_admin: boolean
          is_auditor: boolean
          notif_seen_at: string
        }
        Insert: {
          id: string
          tenant_id[]: string | null
          full_name[]: string
          email[]: string | null
          is_super_admin[]: boolean
          is_active[]: boolean
          created_at[]: string
          is_tenant_admin[]: boolean
          is_auditor[]: boolean
          notif_seen_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          full_name?: string | null
          email?: string | null
          is_super_admin?: boolean | null
          is_active?: boolean | null
          created_at?: string | null
          is_tenant_admin?: boolean | null
          is_auditor?: boolean | null
          notif_seen_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "19886"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      project_expenses: {
        Row: {
          id: string
          tenant_id: string
          project_id: string
          expense_date: string
          description: string
          amount: Json
          currency: Database['public']['Enums']['currency_code']
          account_id: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          project_id: string
          expense_date[]: string
          description: string
          amount: Json
          currency[]: Database['public']['Enums']['currency_code']
          account_id[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          project_id?: string | null
          expense_date?: string | null
          description?: string | null
          amount?: Json | null
          currency?: Database['public']['Enums']['currency_code'] | null
          account_id?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20339"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20344"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20349"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      project_milestones: {
        Row: {
          id: string
          tenant_id: string
          project_id: string
          name: string
          due_date: string
          amount: Json
          is_done: boolean
          invoiced: boolean
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          project_id: string
          name: string
          due_date[]: string | null
          amount[]: Json
          is_done[]: boolean
          invoiced[]: boolean
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          project_id?: string | null
          name?: string | null
          due_date?: string | null
          amount?: Json | null
          is_done?: boolean | null
          invoiced?: boolean | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20366"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20371"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          id: string
          tenant_id: string
          code: string
          name: string
          client_id: string
          contract_value: Json
          currency: Database['public']['Enums']['currency_code']
          start_date: string
          end_date: string
          completion_pct: Json
          status: string
          notes: string
          created_at: string
          is_active: boolean
          parent_id: string
          is_group: boolean
        }
        Insert: {
          id[]: string
          tenant_id: string
          code[]: string | null
          name: string
          client_id[]: string | null
          contract_value[]: Json
          currency[]: Database['public']['Enums']['currency_code']
          start_date[]: string | null
          end_date[]: string | null
          completion_pct[]: Json
          status[]: string
          notes[]: string | null
          created_at[]: string
          is_active[]: boolean
          parent_id[]: string | null
          is_group[]: boolean
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          code?: string | null
          name?: string | null
          client_id?: string | null
          contract_value?: Json | null
          currency?: Database['public']['Enums']['currency_code'] | null
          start_date?: string | null
          end_date?: string | null
          completion_pct?: Json | null
          status?: string | null
          notes?: string | null
          created_at?: string | null
          is_active?: boolean | null
          parent_id?: string | null
          is_group?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "20256"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20261"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20867"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_entries: {
        Row: {
          id: string
          tenant_id: string
          name: string
          description: string
          currency: string
          debit_account_id: string
          credit_account_id: string
          amount: number
          frequency: string
          next_date: string
          end_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          name: string
          description[]: string | null
          currency[]: string
          debit_account_id: string
          credit_account_id: string
          amount[]: number
          frequency[]: string
          next_date[]: string
          end_date[]: string | null
          is_active[]: boolean
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          name?: string | null
          description?: string | null
          currency?: string | null
          debit_account_id?: string | null
          credit_account_id?: string | null
          amount?: number | null
          frequency?: string | null
          next_date?: string | null
          end_date?: string | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20892"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20897"
            columns: ["debit_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20902"
            columns: ["credit_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_moves: {
        Row: {
          id: string
          tenant_id: string
          product_id: string
          warehouse_id: string
          move_date: string
          direction: string
          qty: Json
          unit_cost: Json
          project_id: string
          partner_id: string
          reference: string
          created_at: string
          document_id: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          product_id: string
          warehouse_id: string
          move_date[]: string
          direction: string
          qty: Json
          unit_cost[]: Json
          project_id[]: string | null
          partner_id[]: string | null
          reference[]: string | null
          created_at[]: string
          document_id[]: string | null
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          product_id?: string | null
          warehouse_id?: string | null
          move_date?: string | null
          direction?: string | null
          qty?: Json | null
          unit_cost?: Json | null
          project_id?: string | null
          partner_id?: string | null
          reference?: string | null
          created_at?: string | null
          document_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20280"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20285"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20290"
            columns: ["warehouse_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20295"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20300"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20586"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_history: {
        Row: {
          id: string
          tenant_id: string
          plan: string
          start_date: string
          end_date: string
          amount: number
          notes: string
          created_by: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          plan: string
          start_date: string
          end_date: string
          amount[]: number
          notes[]: string | null
          created_by[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          plan?: string | null
          start_date?: string | null
          end_date?: string | null
          amount?: number | null
          notes?: string | null
          created_by?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20436"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_features: {
        Row: {
          id: string
          tenant_id: string
          module: string
          enabled: boolean
        }
        Insert: {
          id[]: string
          tenant_id: string
          module: string
          enabled[]: boolean
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          module?: string | null
          enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "19870"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_payments: {
        Row: {
          id: string
          tenant_id: string
          pay_date: string
          amount: number
          notes: string
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          pay_date[]: string
          amount[]: number
          notes[]: string | null
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          pay_date?: string | null
          amount?: number | null
          notes?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20643"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_settings: {
        Row: {
          tenant_id: string
          cash_account_id: string
          customers_account_id: string
          suppliers_account_id: string
          inventory_account_id: string
          sales_account_id: string
          cogs_account_id: string
          project_cost_account_id: string
          updated_at: string
          fx_account_id: string
          retained_earnings_account_id: string
          salaries_account_id: string
          advances_account_id: string
          inventory_adjust_account_id: string
          cost_method: string
          fiscal_start: string
          fiscal_end: string
          period_type: string
          closed_until: string
          logo_url: string
          primary_color: string
          onboarding_done: boolean
          auto_backup: boolean
          last_backup_at: string
          backup_every_days: number
        }
        Insert: {
          tenant_id: string
          cash_account_id[]: string | null
          customers_account_id[]: string | null
          suppliers_account_id[]: string | null
          inventory_account_id[]: string | null
          sales_account_id[]: string | null
          cogs_account_id[]: string | null
          project_cost_account_id[]: string | null
          updated_at[]: string
          fx_account_id[]: string | null
          retained_earnings_account_id[]: string | null
          salaries_account_id[]: string | null
          advances_account_id[]: string | null
          inventory_adjust_account_id[]: string | null
          cost_method[]: string
          fiscal_start[]: string | null
          fiscal_end[]: string | null
          period_type[]: string
          closed_until[]: string | null
          logo_url[]: string | null
          primary_color[]: string | null
          onboarding_done[]: boolean
          auto_backup[]: boolean
          last_backup_at[]: string | null
          backup_every_days[]: number
        }
        Update: {
          tenant_id?: string | null
          cash_account_id?: string | null
          customers_account_id?: string | null
          suppliers_account_id?: string | null
          inventory_account_id?: string | null
          sales_account_id?: string | null
          cogs_account_id?: string | null
          project_cost_account_id?: string | null
          updated_at?: string | null
          fx_account_id?: string | null
          retained_earnings_account_id?: string | null
          salaries_account_id?: string | null
          advances_account_id?: string | null
          inventory_adjust_account_id?: string | null
          cost_method?: string | null
          fiscal_start?: string | null
          fiscal_end?: string | null
          period_type?: string | null
          closed_until?: string | null
          logo_url?: string | null
          primary_color?: string | null
          onboarding_done?: boolean | null
          auto_backup?: boolean | null
          last_backup_at?: string | null
          backup_every_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "20452"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20457"
            columns: ["cash_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20462"
            columns: ["customers_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20467"
            columns: ["suppliers_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20472"
            columns: ["inventory_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20477"
            columns: ["sales_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20482"
            columns: ["cogs_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20487"
            columns: ["project_cost_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20717"
            columns: ["fx_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20722"
            columns: ["retained_earnings_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20727"
            columns: ["salaries_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20732"
            columns: ["advances_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20737"
            columns: ["inventory_adjust_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          id: string
          name: string
          code: string
          phone: string
          address: string
          is_active: boolean
          created_at: string
          plan: string
          sub_start: string
          sub_end: string
          max_users: number
          notes: string
          subscription_fee: number
        }
        Insert: {
          id[]: string
          name: string
          code[]: string | null
          phone[]: string | null
          address[]: string | null
          is_active[]: boolean
          created_at[]: string
          plan[]: string
          sub_start[]: string
          sub_end[]: string
          max_users[]: number
          notes[]: string | null
          subscription_fee[]: number
        }
        Update: {
          id?: string | null
          name?: string | null
          code?: string | null
          phone?: string | null
          address?: string | null
          is_active?: boolean | null
          created_at?: string | null
          plan?: string | null
          sub_start?: string | null
          sub_end?: string | null
          max_users?: number | null
          notes?: string | null
          subscription_fee?: number | null
        }
        Relationships: [
        ]
      }
      units: {
        Row: {
          id: string
          tenant_id: string
          name: string
          base_unit: string
          factor: number
          created_at: string
        }
        Insert: {
          id[]: string
          tenant_id: string
          name: string
          base_unit[]: string | null
          factor[]: number
          created_at[]: string
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          name?: string | null
          base_unit?: string | null
          factor?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "20851"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          id: string
          tenant_id: string
          user_id: string
          module: string
          can_view: boolean
          can_create: boolean
          can_edit: boolean
          can_delete: boolean
        }
        Insert: {
          id[]: string
          tenant_id: string
          user_id: string
          module: string
          can_view[]: boolean
          can_create[]: boolean
          can_edit[]: boolean
          can_delete[]: boolean
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          user_id?: string | null
          module?: string | null
          can_view?: boolean | null
          can_create?: boolean | null
          can_edit?: boolean | null
          can_delete?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "19905"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "19910"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      warehouses: {
        Row: {
          id: string
          tenant_id: string
          code: string
          name: string
          location: string
          created_at: string
          is_active: boolean
          parent_id: string
          is_group: boolean
        }
        Insert: {
          id[]: string
          tenant_id: string
          code[]: string | null
          name: string
          location[]: string | null
          created_at[]: string
          is_active[]: boolean
          parent_id[]: string | null
          is_group[]: boolean
        }
        Update: {
          id?: string | null
          tenant_id?: string | null
          code?: string | null
          name?: string | null
          location?: string | null
          created_at?: string | null
          is_active?: boolean | null
          parent_id?: string | null
          is_group?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "20207"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "20873"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "warehouses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_currency: {
        Args: {
          _code: string
          _name: string
          _symbol: string
        }
        Returns: Json
      }
      attach_module: {
        Args: {
          _t: string
        }
        Returns: string
      }
      claim_super_admin: {
        Args: {
        }
        Returns: boolean
      }
      clear_tenant_data: {
        Args: {
          _id: string
        }
        Returns: Json
      }
      close_fiscal_year: {
        Args: {
        }
        Returns: Json
      }
      current_tenant_id: {
        Args: {
        }
        Returns: string
      }
      has_perm: {
        Args: { _module: string, _action: Database['public']['Enums']['perm_action'] } | { _module: string, _action: string }
        Returns: boolean
      }
      is_auditor: {
        Args: {
        }
        Returns: boolean
      }
      is_auditor_or_admin: {
        Args: {
        }
        Returns: boolean
      }
      is_super_admin: {
        Args: {
        }
        Returns: boolean
      }
      is_tenant_admin: {
        Args: {
        }
        Returns: boolean
      }
      mark_notifications_seen: {
        Args: {
        }
        Returns: Json
      }
      my_tenant_id: {
        Args: {
        }
        Returns: string
      }
      post_document: {
        Args: {
          _id: string
        }
        Returns: string
      }
      purge_tenant: {
        Args: {
          _id: string
        }
        Returns: Json
      }
      reopen_fiscal_period: {
        Args: {
        }
        Returns: Json
      }
      restore_tenant: {
        Args: {
          _id: string
          _data: Json
        }
        Returns: Json
      }
      set_entry_audited: {
        Args: {
          _id: string
          _ok: boolean
        }
        Returns: Json
      }
      tenant_active: {
        Args: {
        }
        Returns: boolean
      }
      unpost_document: {
        Args: {
          _id: string
        }
        Returns: Json
      }
      update_company_info: {
        Args: {
          _name: string
          _code: string
          _phone: string
          _address: string
          _notes: string
        }
        Returns: Json
      }
    }
    Enums: {
      account_nature: "closing" | "balance_sheet" | "profit_loss"
      currency_code: "USD" | "SYP"
      perm_action: "view" | "create" | "edit" | "delete"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (TableName extends keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
      ? DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] extends Record<
            TableName,
            { Row: infer R }
          >
          ? R
          : never
        : never
      : never)
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Row: infer R }
      ? R
      : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Views"]
      ? DefaultSchema["Views"][DefaultSchemaTableNameOrOptions] extends { Row: infer R }
        ? R
        : never
      : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (TableName extends keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      ? DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] extends Record<
            TableName,
            { Insert: infer I }
          >
          ? I
          : never
        : never
      : never)
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Insert: infer I }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (TableName extends keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
      ? DefaultSchemaTableNameOrOptions["schema"] extends keyof DatabaseWithoutInternals
        ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] extends Record<
            TableName,
            { Update: infer U }
          >
          ? U
          : never
        : never
      : never)
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends { Update: infer U }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (EnumName extends keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
      ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
      : never)
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never
