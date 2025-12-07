import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Plus, Package, ExternalLink, Trash2, Link2, TrendingUp } from 'lucide-react';
import Logo from '@/components/Logo';

interface Product {
  id: string;
  product_name: string;
  product_url: string;
  price: number;
  currency: string;
  sales_count: number;
  linked_posts: string[];
}

const Ecommerce = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_url: '',
    price: '',
    currency: 'IDR'
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('ecommerce_products')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    setProducts(data || []);
  };

  const addProduct = async () => {
    if (!user || !newProduct.product_name) {
      toast.error('Nama produk harus diisi');
      return;
    }

    const { error } = await supabase
      .from('ecommerce_products')
      .insert({
        user_id: user.id,
        product_name: newProduct.product_name,
        product_url: newProduct.product_url,
        price: parseFloat(newProduct.price) || 0,
        currency: newProduct.currency,
        sales_count: 0,
        linked_posts: []
      });

    if (error) {
      toast.error('Gagal menambahkan produk');
      console.error('Error adding product:', error);
      return;
    }

    toast.success('Produk berhasil ditambahkan!');
    setShowAddForm(false);
    setNewProduct({
      product_name: '',
      product_url: '',
      price: '',
      currency: 'IDR'
    });
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('ecommerce_products')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Gagal menghapus produk');
      return;
    }

    toast.success('Produk berhasil dihapus');
    fetchProducts();
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  const totalRevenue = products.reduce((acc, p) => acc + (p.price * p.sales_count), 0);
  const totalSales = products.reduce((acc, p) => acc + p.sales_count, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-foreground/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/kontenih-ai')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-foreground/40">/</span>
              <span className="font-medium">E-commerce</span>
            </div>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Button>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-rose-500/10 to-red-500/10 border-rose-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-rose-400" />
              </div>
              <div className="text-2xl font-bold">{products.length}</div>
              <div className="text-xs text-foreground/50">Total Produk</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold">{totalSales}</div>
              <div className="text-xs text-foreground/50">Total Penjualan</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 md:col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold">{formatPrice(totalRevenue, 'IDR')}</div>
              <div className="text-xs text-foreground/50">Total Revenue (Estimasi)</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Products List */}
        {products.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
            <h3 className="text-lg font-medium mb-2">Belum ada produk</h3>
            <p className="text-foreground/50 mb-6">Tambahkan produk untuk menghubungkan dengan campaign</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk Pertama
            </Button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background/50 border-foreground/10 hover:border-rose-500/30 transition-all group overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-red-500/20 flex items-center justify-center">
                          <Package className="w-6 h-6 text-rose-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{product.product_name}</h3>
                          <div className="text-lg font-bold text-green-400">
                            {formatPrice(product.price, product.currency)}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 rounded-lg bg-foreground/5">
                        <div className="text-xl font-bold">{product.sales_count}</div>
                        <div className="text-xs text-foreground/50">Terjual</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-foreground/5">
                        <div className="text-xl font-bold">{product.linked_posts?.length || 0}</div>
                        <div className="text-xs text-foreground/50">Linked Posts</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.product_url ? (
                        <a
                          href={product.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <ExternalLink className="w-3 h-3" />
                            Lihat Produk
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1 gap-2" disabled>
                          <Link2 className="w-3 h-3" />
                          Tidak ada link
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Integration Info */}
        <motion.div
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-rose-500/5 to-red-500/5 border border-rose-500/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-rose-400" />
            Integrasi E-commerce
          </h3>
          <p className="text-sm text-foreground/60 mb-4">
            Hubungkan produk Anda dengan posting konten untuk tracking konversi. 
            Setiap posting dapat di-link dengan produk untuk melihat performa penjualan dari campaign marketing Anda.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-foreground/10 text-foreground/60">Shopee</span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-foreground/10 text-foreground/60">Tokopedia</span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-foreground/10 text-foreground/60">Instagram Shop</span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400">Coming Soon</span>
          </div>
        </motion.div>
      </main>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              className="w-full max-w-md bg-background rounded-2xl border border-foreground/10 p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-6">Tambah Produk</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">Nama Produk *</label>
                  <Input
                    placeholder="Nama produk..."
                    value={newProduct.product_name}
                    onChange={e => setNewProduct({...newProduct, product_name: e.target.value})}
                    className="bg-background/50"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-foreground/60 mb-2 block">URL Produk</label>
                  <Input
                    placeholder="https://..."
                    value={newProduct.product_url}
                    onChange={e => setNewProduct({...newProduct, product_url: e.target.value})}
                    className="bg-background/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Harga</label>
                    <Input
                      type="number"
                      placeholder="100000"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/60 mb-2 block">Currency</label>
                    <select
                      value={newProduct.currency}
                      onChange={e => setNewProduct({...newProduct, currency: e.target.value})}
                      className="w-full h-10 px-3 rounded-md bg-background/50 border border-input text-sm"
                    >
                      <option value="IDR">IDR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                    Batal
                  </Button>
                  <Button onClick={addProduct} className="flex-1">
                    Tambah Produk
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Ecommerce;
