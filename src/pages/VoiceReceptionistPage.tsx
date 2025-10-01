import VoiceReceptionist from '@/components/VoiceReceptionist';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VoiceReceptionistPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <VoiceReceptionist />
      <Footer />
    </div>
  );
};

export default VoiceReceptionistPage;
